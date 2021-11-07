from django.http import HttpResponse, HttpResponseNotAllowed
import json
from django.http.response import HttpResponseBadRequest, JsonResponse
from json.decoder import JSONDecodeError
from django.forms.models import model_to_dict

from work.models import Work
from review.models import Review
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt

def work_id(request, id):  # TODO
    work = Work.objects.filter(id=id).values()
    if not work:
        return HttpResponse(status=404)

    if request.method == 'GET':
        return JsonResponse(list(work), safe = False, status = 200)
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
        User = get_user_model()
        
        request_user = request.user
        if not request_user.is_authenticated:
            return HttpResponse(status = 401)

        user = User.objects.filter(id = request_user.id)
        if not user:
            return HttpResponse(status = 403)

        try:
            body = json.loads(request.body.decode())
            title = body['title']
            content = body['content']
            score = body['score']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        
        review = Review(author = request_user, work = work, title = title, content = content, score = score)
        review.save()
        review_json = model_to_dict(review)
        return JsonResponse(review_json, status=201) 
    
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


def work_main(request):  # TODO
    return HttpResponse(status=501)


def work_recommend(request):  # TODO
    return HttpResponse(status=501)


def work_search(request):  # TODO
    return HttpResponse(status=501)
