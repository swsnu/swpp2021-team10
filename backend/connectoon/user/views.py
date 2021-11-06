from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import get_user_model
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse

import json
from json.decoder import JSONDecodeError

from tag.models import Tag
from user.models import UserTagFav


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])


def user_register(request):
    User = get_user_model()
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            username = req_data['username']
            password = req_data['password']
            tags = req_data['tags']
            # profile_picture = req_data['profile_picture'] TODO : need to implement profile_picture feature
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()

        tag_found = []
        for tag_id in tags:
            try:
                tag_obj = Tag.objects.get(id=tag_id)
                tag_found.append(tag_obj)
            except (Tag.DoesNotExist) as e:
                return HttpResponseBadRequest()

        created_user = User.objects.create_user(email=email, password=password, username=username)

        for tag_obj in tag_found:
            UserTagFav.objects.create(user=created_user, tag=tag_obj)

        response_dict = {'id': created_user.id, 'email': created_user.email, 'username': created_user.username}
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])


def user_login(request):  # TODO
    return HttpResponse(status=501)


def user_id(request, id):  # TODO
    return HttpResponse(status=501)


def user_me(request):  # TODO
    return HttpResponse(status=501)


def user_me_review(request):  # TODO
    return HttpResponse(status=501)
