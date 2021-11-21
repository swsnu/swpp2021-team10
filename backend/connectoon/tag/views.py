from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from .models import Tag

import json
import re

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
    elif request.method == 'POST':
        req_data = json.loads(request.body.decode())
        name = req_data['name']
        prior = req_data['prior']
        try:
            tag = Tag.objects.get(name=name)
            tag.prior = prior
        except:
            tag = Tag(name=name, prior=prior)
            tag.save()
            tag = Tag.objects.get(name=name)
        
        related = re.split(',', req_data['related'])
        related_list = []
        for rl in related:
            try:
                temptag = Tag.objects.get(name=rl)
            except:
                temptag = Tag(name=rl)
                temptag.save()
                temptag = Tag.objects.get(name=rl)
            related_list.append(temptag)
        
        for rt in related_list:
            tag.related.add(rt)
        tag.save()

        return JsonResponse({'id': tag.id, 'name': tag.name, 'prior': tag.prior}, status=201)
    else:
        return HttpResponse(status=501)
