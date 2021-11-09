
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

def work_id(request, id):  # TODO
    try:
        work = Work.objects.get(id = id)
    except Work.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        work_json = model_to_dict(work)

        work_json.pop('completion')
        
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
        review_json.pop('updated_at', None)
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
    return HttpResponse(status=501)
