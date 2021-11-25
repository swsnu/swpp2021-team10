from django.db import IntegrityError, transaction
from django.utils.datastructures import MultiValueDictKeyError
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import get_user_model, authenticate, login as auth_login, logout as auth_logout
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, HttpResponseForbidden, JsonResponse

import json
from json.decoder import JSONDecodeError

from django.views.decorators.http import require_POST

from tag.models import Tag
from user.models import UserTagFav


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
    for tag_id in tags:
        try:
            tag_obj = Tag.objects.get(id=tag_id)
            tag_found.append(tag_obj)
        except (Tag.DoesNotExist) as e:
            return HttpResponseBadRequest()

    try:
        with transaction.atomic():
            created_user = user_class.objects.create_user(email=email, password=password, username=username)
    except IntegrityError:
        return HttpResponseBadRequest()

    for tag_obj in tag_found:
        UserTagFav.objects.create(user=created_user, tag=tag_obj)

    if (profile_picture):
        created_user.profile_picture = profile_picture
    created_user.save()

    user_tag = created_user.user_tag.all()
    tag_list = [{'id': user_tag.tag.id, 'name': user_tag.tag.name} for user_tag in user_tag]

    response_dict = {
        'id': created_user.id,
        'email': created_user.email,
        'username': created_user.username,
        'tags': tag_list,
        'profile_picture': request.build_absolute_uri(created_user.profile_picture.url) if created_user.profile_picture else ''
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
            response_dict = {'id': user.id, 'username': user.username, 'email': user.email}
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

def user_id(request, id):  # TODO
    return HttpResponse(status=501)


def user_me(request):
    request_user = request.user
    if request.method == 'GET':
        if request_user.is_authenticated:

            user_tag = request_user.user_tag.all()
            tag_list = [{'id': user_tag.tag.id, 'name': user_tag.tag.name } for user_tag in user_tag]

            # TODO : Add profile_picture
            response_dict = {'id': request_user.id, 'username': request_user.username, 'email': request_user.email, 'tags': tag_list}
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])




def user_me_review(request):  # TODO
    return HttpResponse(status=501)
