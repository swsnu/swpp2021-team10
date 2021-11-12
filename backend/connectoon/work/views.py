from django.http import HttpResponse, HttpResponseNotAllowed
import json
import re
from django.http.response import HttpResponseBadRequest, JsonResponse
from json.decoder import JSONDecodeError
from django.forms.models import model_to_dict

from work.models import Work
from review.models import Review
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt

def work_id(request, id):
    try:
        work = Work.objects.get(id = id)
    except Work.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        tag_name = [tag.name for tag in work.tags.all()]
        artist_name = [artist.name for artist in work.artists.all()]
        work_json = {
            "id": work.id, "title": work.title, "description": work.description, "link": work.link,
            "thumbnail_picture": work.thumbnail_picture, "platform_id": work.platform_id, "year": work.year, 
            "tags": tag_name, "artists": artist_name, "score_avg": work.score_avg,
        }
        return JsonResponse(work_json, status = 200)
    else:
        return HttpResponseNotAllowed(['GET'])


def work_id_review(request, id):

    try:
        work = Work.objects.get(id = id)
    except Work.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        reviews = Review.objects.filter(work = id).values()
        response_dict = []
        
        for review in reviews:
            response_dict.append(review)
        
        return JsonResponse(response_dict, safe = False)


    elif request.method == 'POST':
        request_user = request.user
        if not request_user.is_authenticated:
            return HttpResponse(status = 401)

        try:
            body = json.loads(request.body.decode())
            title = body['title']
            content = body['content']
            score = body['score']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        
        review = Review(author = request_user, work = work, title = title, content = content, score = score)
        review.save()
        
        work.review_num = work.review_num + 1
        work.score_sum = work.score_sum + float(score)
        work.score_avg = work.score_sum / work.review_num
        work.save()

        review_json = model_to_dict(review)
        return JsonResponse(review_json, status=201) 
    
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


def work_main(request):
    if request.method == 'GET':
        most_reviewed_work_objects = Work.objects.all().order_by('-review_num')
        most_reviewed_works = []
        for work in most_reviewed_work_objects:
            artist_name = [artist.name for artist in work.artists.all()]
            most_reviewed_works.append({
                "id": work.id, "title": work.title, "thumbnail_picture": work.thumbnail_picture, "platform_id": work.platform_id, 
                "year": work.year, "artists": artist_name, "score_avg": work.score_avg, "completion": work.completion,
            })
        most_reviewed_works_json = json.dumps(list(most_reviewed_works))

        highest_rated_work_objects = Work.objects.all().order_by('-score_avg')
        highest_rated_works = []
        for work in highest_rated_work_objects:
            artist_name = [artist.name for artist in work.artists.all()]
            highest_rated_works.append({
                "id": work.id, "title": work.title, "thumbnail_picture": work.thumbnail_picture, "platform_id": work.platform_id, 
                "year": work.year, "artists": artist_name, "score_avg": work.score_avg, "completion": work.completion,
            })
        highest_rated_works_json = json.dumps(list(highest_rated_works))

        return JsonResponse({"worklists": [{"title" : "Most reviewed works", "works": most_reviewed_works_json}, {"title" : "Highest rated works", "works": highest_rated_works_json}]}, status = 200)
    else:
        return HttpResponseNotAllowed(['GET'])


def work_recommend(request):  # TODO
    return HttpResponse(status=501)

def work_search(request):  # TODO
    if request.method == 'GET':
        work_all_list = [work for work in Work.objects.all().values()]
        return_work_list = [[], []]
        keyword = request.GET.get('q', None)
        keytag = request.GET.get('tags', None)
        if keyword == '' and keytag == '':
            keyword = "Response of empty query must be an empty list!"
            keytag = "$Responseofemptyquerymustbeanemptylist!"

        keytaglist = keytag.split('$')
        del keytaglist[0]   #delete empty string
        
        for work in work_all_list:
            tempartist = [artist for artist in Work.objects.get(title=work['title']).artists.all().values()]
            artistlist = []
            for ta in tempartist:
                artistlist.append(ta['name'])
            artistStr = ""
            if len(artistlist) > 0:
                artistStr = artistlist[0]
                del artistlist[0]
            for ta in artistlist:
                artistStr += ", " + ta

            artist_name = [artist.name for artist in Work.objects.get(title=work['title']).artists.all()]

            tagcheck = True
            taglist = [tag for tag in Work.objects.get(title=work['title']).tags.all().values()]
            for kta in keytaglist:
                forcheck = False
                for ta in taglist:
                    if ta['name'] == kta:
                        forcheck = True
                        break
                if not forcheck:
                    tagcheck = False
                    break
            
            if (keyword in work['title']) and tagcheck:
                return_work_list[0].append({'title': work['title'], 'thumbnail_picture': work['thumbnail_picture'],
                'description': work['description'], 'year': work['year'], 'link': work['link'],
                'completion': work['completion'], 'score_avg': work['score_avg'], 'review_num': work['review_num'],
                'platform_id': work['platform_id'], 'artists': artist_name, 'id': work['id']})
            elif (keyword in artistStr) and tagcheck:
                return_work_list[1].append({'title': work['title'], 'thumbnail_picture': work['thumbnail_picture'],
                'description': work['description'], 'year': work['year'], 'link': work['link'],
                'completion': work['completion'], 'score_avg': work['score_avg'], 'review_num': work['review_num'],
                'platform_id': work['platform_id'], 'artists': artist_name, 'id': work['id']})
        return JsonResponse(return_work_list, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])
