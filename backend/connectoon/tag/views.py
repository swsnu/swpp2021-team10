from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from .models import Tag

import json
import re

#from django.views.decorators.csrf import csrf_exempt
#@csrf_exempt
def tag_search(request):  # TODO
    if request.method == 'GET':
        tag_all_list = [tag for tag in Tag.objects.all().values()]
        return_tag_list = []
        keyword = request.GET.get('q', None)
        for tag in tag_all_list:
            if keyword in tag['name']:
                related_list = []
                temptag = [tag for tag in Tag.objects.get(name=tag['name']).related.all().values()]
                for tt in temptag:
                    related_list.append(tt['id'])
                return_tag_list.append({'key': tag['id'], 'name': tag['name'], 'related': related_list, 'prior': tag['prior']})
        return JsonResponse(return_tag_list, safe=False)
    else:
        return HttpResponse(status=501)
