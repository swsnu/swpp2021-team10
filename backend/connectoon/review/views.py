from django.core.exceptions import BadRequest
from django.http import HttpResponse, HttpResponseNotAllowed
import json
from django.http.response import HttpResponseBadRequest, JsonResponse
from json.decoder import JSONDecodeError
from django.views.decorators.http import require_GET
from django.forms.models import model_to_dict
from .models import Review


def review_id(request, id):  # TODO
    try:
        review = Review.objects.get(id = id)
    except Review.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        review_json = model_to_dict(review)
        review_json.pop('updated_at', None)

        return JsonResponse(review_json, status = 200)
    elif request.method == 'PUT':
        request_user = request.user
        if not request_user.is_authenticated:
            return HttpResponse(status = 401)

        if request_user.id != review.author.id:
            return HttpResponse(status = 403)

        try:
            body = json.loads(request.body.decode())
            title = body['title']
            content = body['content']
            score = body['score']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        
        prev_review_score = review.score
        review.title = title
        review.content = content
        review.score = score
        review.save()
        
        work = review.work
        work.score_sum = work.score_sum - prev_review_score + float(score)
        work.score_avg = work.score_sum / work.review_num
        work.save()

        review_json = model_to_dict(review)

        return JsonResponse(review_json, status=200)
    elif request.method == 'DELETE':
        request_user = request.user
        if not request_user.is_authenticated:
            return HttpResponse(status = 401)
        
        if request_user.id != review.author.id:
            return HttpResponse(status = 403)

        work = review.work
        work.score_sum = work.score_sum - review.score
        work.review_num = work.review_num - 1
        work.score_avg = work.score_sum / work.review_num
        work.save()
        
        review.delete()
        
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

@require_GET
def review_board(request):
    board_reviews = Review.objects.filter(likes__gte=10).order_by('updated_at').values()
    board_reviews_json = json.dumps(list(board_reviews), default=str)

    return JsonResponse({"reviews": board_reviews_json}, status = 200)
