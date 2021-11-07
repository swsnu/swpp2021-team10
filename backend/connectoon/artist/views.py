from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from .models import Artist
from django.views.decorators.csrf import csrf_exempt

import json

def add_artist(request):  # TODO
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        name = req_data['name']
        artist = Artist(name=name)
        artist.save()
        return JsonResponse({'name': artist.name}, status=201)
    else:
        return HttpResponse(status=501)
