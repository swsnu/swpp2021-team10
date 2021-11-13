from django.http import HttpResponse, HttpResponseNotAllowed
import json
from django.http.response import HttpResponseBadRequest, JsonResponse
from json.decoder import JSONDecodeError
from django.views.decorators.http import require_GET
from django.forms.models import model_to_dict
from .models import Review

@require_GET
def review_id(request, id):  # TODO
    try:
        review = Review.objects.get(id = id)
    except Review.DoesNotExist:
        return HttpResponse(status=404)

    review_json = model_to_dict(review)
    review_json.pop('updated_at', None)

    return JsonResponse(review_json, status = 200)

@require_GET
def review_board(request):
    board_reviews = Review.objects.filter(likes__gte=10).order_by('updated_at').values()
    board_reviews_json = json.dumps(list(board_reviews), default=str)

    return JsonResponse({"reviews": board_reviews_json}, status = 200)
