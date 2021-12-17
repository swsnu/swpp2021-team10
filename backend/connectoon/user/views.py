from django.db import IntegrityError, transaction
from django.utils.datastructures import MultiValueDictKeyError
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import get_user_model, authenticate, login as auth_login, logout as auth_logout
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, HttpResponseForbidden, \
    JsonResponse, QueryDict
from django.views.decorators.http import require_GET

import json
from json.decoder import JSONDecodeError
import re

from django.views.decorators.http import require_POST

from tag.models import Tag
from user.models import UserTagFav
from review.models import Review, ReviewUserLike


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])


@require_POST
def user_register(request):
    user_class = get_user_model()
    try:
        email = request.POST['email']
        username = request.POST['username']
        password = request.POST['password']
    except MultiValueDictKeyError:
        return HttpResponseBadRequest()

    tags = request.POST.getlist('tags', [])
    profile_picture = request.FILES.get('profile_picture')

    tag_found = []
    for tag_name in tags:
        try:
            tag_obj = Tag.objects.get(name=tag_name)
            tag_found.append(tag_obj)
        except Tag.DoesNotExist as e:
            return HttpResponseBadRequest()

    try:
        with transaction.atomic():
            created_user = user_class.objects.create_user(email=email, password=password, username=username)
    except IntegrityError:
        return HttpResponseBadRequest()

    for tag_obj in tag_found:
        UserTagFav.objects.create(user=created_user, tag=tag_obj)

    if profile_picture:
        created_user.profile_picture = profile_picture
        created_user.transferred_picture = created_user.profile_picture
    created_user.save()

    user_tag = created_user.user_tag.all()
    tag_list = [{'id': user_tag.tag.id, 'name': user_tag.tag.name} for user_tag in user_tag]

    if created_user.want_transferred:
        return_picture = request.build_absolute_uri(created_user.transferred_picture.url) if created_user.transferred_picture else ''
    else:
        return_picture = request.build_absolute_uri(created_user.profile_picture.url) if created_user.profile_picture else ''

    response_dict = {
        'id': created_user.id,
        'email': created_user.email,
        'username': created_user.username,
        'tags': tag_list,
        'profile_picture': return_picture.replace('http', 'https')
    }

    return JsonResponse(response_dict, status=201)


def user_dup_email(request):
    user_class = get_user_model()
    if request.method == 'POST':

        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()

        r = re.compile(
            '(?:[a-z0-9!#$%&*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])')
        match = re.match(r, email)
        if match is None:
            return HttpResponseBadRequest()

        try:
            user_class.objects.get(email=email)
        except user_class.DoesNotExist:
            return HttpResponse(status=204)

        return HttpResponseBadRequest()
    else:
        return HttpResponseNotAllowed(['POST'])


def user_dup_username(request):
    user_class = get_user_model()
    if request.method == 'POST':

        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()

        try:
            user_class.objects.get(username=username)
        except user_class.DoesNotExist:
            return HttpResponse(status=204)

        return HttpResponseBadRequest()
    else:
        return HttpResponseNotAllowed(['POST'])


def user_login(request):
    if request.method == 'POST':

        # Decode Json
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        # Load User
        user = authenticate(request, email=email, password=password)

        # Check Available
        if user is not None:
            auth_login(request, user)

            user_tags = user.user_tag.all()

            return_tag_list = []
            for user_tag in user_tags:
                tag = user_tag.tag
                related_list = []
                temptag = [tag for tag in Tag.objects.get(name=tag.name).related.all().values()]
                for tt in temptag:
                    related_list.append(tt['id'])
                return_tag_list.append(
                    {'key': tag.id, 'name': tag.name, 'related': related_list, 'prior': tag.prior})

            if user.want_transferred:
                return_picture = request.build_absolute_uri(user.transferred_picture.url) if user.transferred_picture else ''
            else:
                return_picture = request.build_absolute_uri(user.profile_picture.url) if user.profile_picture else ''

            response_dict = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'tags': return_tag_list,
                'profile_picture': return_picture.replace('http', 'https')
            }

            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])


def user_logout(request):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        auth_logout(request)
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['GET'])


@require_GET
def user_id(request, id):
    user_class = get_user_model()
    try:
        found_user = user_class.objects.get(id=id)
    except user_class.DoesNotExist:
        return HttpResponseBadRequest()

    user_tags = found_user.user_tag.all()

    return_tag_list = []
    for user_tag in user_tags:
        tag = user_tag.tag
        related_list = []
        temptag = [tag for tag in Tag.objects.get(name=tag.name).related.all().values()]
        for tt in temptag:
            related_list.append(tt['id'])
        return_tag_list.append(
            {'key': tag.id, 'name': tag.name, 'related': related_list, 'prior': tag.prior})

    if found_user.want_transferred:
        return_picture = request.build_absolute_uri(found_user.transferred_picture.url) if found_user.transferred_picture else ''
    else:
        return_picture = request.build_absolute_uri(found_user.profile_picture.url) if found_user.profile_picture else ''

    response_dict = {
        'id': found_user.id,
        'username': found_user.username,
        'email': found_user.email,
        'tags': return_tag_list,
        'profile_picture': return_picture.replace('http', 'https')
    }

    return JsonResponse(response_dict, status=200)


def user_me(request):
    request_user = request.user
    if request.method == 'GET':
        if request_user.is_authenticated:

            user_tags = request_user.user_tag.all()

            return_tag_list = []
            for user_tag in user_tags:
                tag = user_tag.tag
                related_list = []
                temptag = [reltag for reltag in tag.related.all().values()]
                for tt in temptag:
                    related_list.append(tt['id'])
                return_tag_list.append(
                    {'key': tag.id, 'name': tag.name, 'related': related_list, 'prior': tag.prior})

            if request_user.want_transferred:
                return_picture = request.build_absolute_uri(
                    request_user.transferred_picture.url) if request_user.transferred_picture else ''
            else:
                return_picture = request.build_absolute_uri(
                    request_user.profile_picture.url) if request_user.profile_picture else ''

            response_dict = {
                'id': request_user.id,
                'username': request_user.username,
                'email': request_user.email,
                'tags': return_tag_list,
                'profile_picture': return_picture.replace('http', 'https'),
                'want_transferred': request_user.want_transferred
            }
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    if request.method == 'PUT':
        if request_user.is_authenticated:

            request.method = 'POST'
            request._load_post_and_files()
            request.method = 'PUT'
            request.PUT = request.POST

            try:
                username = request.POST['username']
            except MultiValueDictKeyError:
                username = None

            try:
                password = request.POST['password']
            except MultiValueDictKeyError:
                password = None

            tags = request.POST.getlist('tags', [])
            profile_picture = request.FILES.get('profile_picture')

            tag_new = []
            for tag_name in tags:
                try:
                    tag_obj = Tag.objects.get(name=tag_name)
                    tag_new.append(tag_obj)
                except Tag.DoesNotExist as e:
                    return HttpResponseBadRequest()

            user_tag_old = request_user.user_tag.all()

            # delete UserTagFav if not in request
            for user_tag in user_tag_old:
                if not (user_tag.tag.name in tags):
                    user_tag.delete()

            # create new UserTagFav if not exist
            user_tag_old_name_list = [ut.tag.name for ut in user_tag_old]
            for tag in tag_new:
                if not (tag.name in user_tag_old_name_list):
                    UserTagFav.objects.create(user=request_user, tag=tag)

            # change data
            if username:
                request_user.username = username

            if password:
                request_user.set_password(password)

            if profile_picture:
                request_user.profile_picture = profile_picture
                request_user.transferred_picture = request_user.profile_picture

            request_user.save()

            updated_user_tag = request_user.user_tag.all()
            tag_list = [{'id': user_tag.tag.id, 'name': user_tag.tag.name} for user_tag in updated_user_tag]

            if request_user.want_transferred:
                return_picture = request.build_absolute_uri(
                    request_user.transferred_picture.url) if request_user.transferred_picture else ''
            else:
                return_picture = request.build_absolute_uri(
                    request_user.profile_picture.url) if request_user.profile_picture else ''

            response_dict = {
                'id': request_user.id,
                'email': request_user.email,
                'username': request_user.username,
                'tags': tag_list,
                'profile_picture': return_picture.replace('http', 'https'),
                'want_transferred': request_user.want_transferred
            }

            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])


@require_GET
def user_me_review(request):
    request_user = request.user

    my_reviews = Review.objects.filter(author__id=request_user.id)
    user_class = get_user_model()
    response_dict = []

    for review in my_reviews:
        work = review.work
        work_artist_name = [artist.name for artist in work.artists.all()]

        work_dict = {
            "id": work.id, "title": work.title, "thumbnail_picture": work.thumbnail_picture,
            "platform_id": work.platform_id, "year": work.year, "artists": work_artist_name
        }

        author = user_class.objects.get(id=review.author_id)
        author_dict = {
            "id": author.id, "username": author.username, "email": author.email,
            # "profile_picture": author.profile_picture
        }

        if ReviewUserLike.objects.filter(user=request_user, review=review):
            clickedLikeReview = True
        else:
            clickedLikeReview = False

        response_dict.append({
            "id": review.id, "title": review.title, "content": review.content, "score": review.score,
            "likes": review.likes,
            "work": work_dict, "author": author_dict, "clickedLike": clickedLikeReview
        })
    
    return JsonResponse({"reviews": response_dict}, status = 200, safe=False)


@require_POST
def user_toggle_transferred(request):
    request_user = request.user
    if request_user.is_authenticated:
        toggled = not request_user.want_transferred
        request_user.want_transferred = toggled

        request_user.save()

        return HttpResponse(status=204)
    else:
        return HttpResponse(status=401)
