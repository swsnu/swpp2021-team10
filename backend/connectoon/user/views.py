from django.http import HttpResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])


def user_register(request):  # TODO
    return HttpResponse(status=501)


def user_login(request):  # TODO
    return HttpResponse(status=501)


def user_id(request, id):  # TODO
    return HttpResponse(status=501)


def user_me(request):  # TODO
    return HttpResponse(status=501)


def user_me_review(request):  # TODO
    return HttpResponse(status=501)
