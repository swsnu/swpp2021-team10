from django.core.exceptions import BadRequest
from django.http import HttpResponse, HttpResponseNotAllowed
import json
from django.http import response
from django.http.response import HttpResponseBadRequest, JsonResponse
from json.decoder import JSONDecodeError
from django.views.decorators.http import require_GET, require_POST
from django.forms.models import model_to_dict
from django.contrib.auth import get_user_model

from work.models import Work
from .models import Review, ReviewUserLike


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
        if work.review_num == 0:
            work.score_avg = 0
        else:
            work.score_avg = work.score_sum / work.review_num
        work.save()
        
        review.delete()
        
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

@require_GET
def review_board(request):
    board_reviews = Review.objects.filter(likes__gte=10).order_by('-updated_at')
    #board_reviews = Review.objects.select_related('work').order_by('-updated_at')
    user_class = get_user_model()
    response_dict = []

    for review in board_reviews:
        work = review.work
        work_artist_name = [artist.name for artist in work.artists.all()]
        
        work_dict = {
            "id": work.id, "title": work.title, "thumbnail_picture": work.thumbnail_picture,
            "platform_id": work.platform_id, "year": work.year, "artists": work_artist_name
        }
        
        author = user_class.objects.get(id=review.author_id)
        author_dict = {
            "id": author.id, "username": author.username, "email": author.email, # "profile_picture": author.profile_picture
        }

        request_user = request.user
        if not request_user.is_authenticated:
            clickedLikeReview = False
        elif ReviewUserLike.objects.filter(user = request_user, review = review):
            clickedLikeReview = True
        else:
            clickedLikeReview = False

        response_dict.append({
            "id": review.id, "title": review.title, "content": review.content, "score": review.score, "likes": review.likes,
            "work": work_dict, "author": author_dict, "clickedLike": clickedLikeReview
        })

    return JsonResponse({"reviews": response_dict}, status = 200, safe=False)

@require_POST
def review_like(request, id):
    try:
        review = Review.objects.get(id = id)
    except Review.DoesNotExist:
        return HttpResponse(status=404)

    request_user = request.user
    if not request_user.is_authenticated:
        return HttpResponse(status = 401)
    if ReviewUserLike.objects.filter(user = request_user, review = review):
        return HttpResponse(status = 403)

    review.likes += 1
    review.save()
    like = ReviewUserLike(user=request_user, review=review)
    like.save()

    user_class = get_user_model()
    work = review.work
    work_artist_name = [artist.name for artist in work.artists.all()]
    
    work_dict = {
        "id": work.id, "title": work.title, "thumbnail_picture": work.thumbnail_picture,
        "platform_id": work.platform_id, "year": work.year, "artists": work_artist_name
    }
    
    author = user_class.objects.get(id=review.author_id)
    author_dict = {
        "id": author.id, "username": author.username, "email": author.email, # "profile_picture": author.profile_picture
    }

    review_val = {
        "id": review.id, "title": review.title, "content": review.content, "score": review.score, "likes": review.likes,
        "work": work_dict, "author": author_dict, "clickedLike": True
    }

    return JsonResponse(review_val, status=200)


@require_POST
def review_unlike(request, id):
    try:
        review = Review.objects.get(id = id)
    except Review.DoesNotExist:
        return HttpResponse(status=404)
        
    request_user = request.user
    if not request_user.is_authenticated:
        return HttpResponse(status = 401)

    try:
        like = ReviewUserLike.objects.get(user = request_user, review = review)
    except ReviewUserLike.DoesNotExist:
        return HttpResponse(status=404)
    like.delete()

    review.likes -= 1
    review.save()
    
    user_class = get_user_model()
    work = review.work
    work_artist_name = [artist.name for artist in work.artists.all()]
    
    work_dict = {
        "id": work.id, "title": work.title, "thumbnail_picture": work.thumbnail_picture,
        "platform_id": work.platform_id, "year": work.year, "artists": work_artist_name
    }
    
    author = user_class.objects.get(id=review.author_id)
    author_dict = {
        "id": author.id, "username": author.username, "email": author.email, # "profile_picture": author.profile_picture
    }

    review_val = {
        "id": review.id, "title": review.title, "content": review.content, "score": review.score, "likes": review.likes,
        "work": work_dict, "author": author_dict, "clickedLike": False
    }
    return JsonResponse(review_val, status=200)

