from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from .models import Artist
from django.views.decorators.csrf import csrf_exempt

import json

def add_artist(request):  # TODO
    return HttpResponse(status=501)
