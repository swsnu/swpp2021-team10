from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from .models import Work
from artist.models import Artist
from tag.models import Tag

import json
import re

def work_id(request, id):  # TODO
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        title = req_data['title']
        thumb = req_data['thumb']
        description = req_data['description']
        year = req_data['year']
        link = req_data['link']
        completion = req_data['completion']
        score = req_data['score']
        review = req_data['review']
        platform_id = req_data['platform']
        artist = re.split(',|/', req_data['artist'])
        work = Work(title=title, thumbnail_picture=thumb, description=description,
        year=year, link=link, completion=completion, score_sum=score, review_num=review,
        platform_id=platform_id)
        work.save()
        work = Work.objects.get(title=title)
        for ar in artist:
            #print(Artist.objects.get(name=ar).name)
            work.artists.add(Artist.objects.get(name=ar))
        work.save()
        return JsonResponse({'title': work.title, 'thumb': work.thumbnail_picture,
        'description': work.description, 'year': work.year, 'link': work.link,
        'completion': work.completion, 'score_sum': work.score_sum, 'review_num': work.review_num,
        'plat': work.platform_id}, status=201)
    else:
        return HttpResponse(status=501)


def work_id_review(request, id):  # TODO
    return HttpResponse(status=501)


def work_main(request):  # TODO
    return HttpResponse(status=501)


def work_recommend(request):  # TODO
    return HttpResponse(status=501)


def work_search(request):  # TODO
    if request.method == 'GET':
        platLogoList = ['/images/naver_logo.png', '/images/kakao_logo.png', '/images/lezhin_logo.png']
        work_all_list = [work for work in Work.objects.all().values()]
        return_work_list = [[], []]
        keyword = request.GET.get('q', None)
        if keyword == '':
            keyword = "Response of empty query must be an empty list!"
        for work in work_all_list:
            #print(work)
            tempartist = [artist for artist in Work.objects.get(title=work['title']).artists.all().values()]
            #print(tempartist)
            artistlist = []
            for ta in tempartist:
                artistlist.append(ta['name'])
            artistStr = artistlist[0]
            del artistlist[0]
            for ta in artistlist:
                artistStr += ", " + ta
            if keyword in work['title']:
                return_work_list[0].append({'title': work['title'], 'src': work['thumbnail_picture'],
                'description': work['description'], 'createdYear': work['year'], 'link': work['link'],
                'completion': work['completion'], 'score': work['score_sum'], 'review_num': work['review_num'],
                'platform': platLogoList[work['platform_id']], 'artist': artistStr, 'key': work['id']})
            elif keyword in artistStr:
                return_work_list[1].append({'title': work['title'], 'src': work['thumbnail_picture'],
                'description': work['description'], 'createdYear': work['year'], 'link': work['link'],
                'completion': work['completion'], 'score': work['score_sum'], 'review_num': work['review_num'],
                'platform': platLogoList[work['platform_id']], 'artist': artistStr, 'key': work['id']})
        return JsonResponse(return_work_list, safe=False)
    else:
        return HttpResponse(status=501)
