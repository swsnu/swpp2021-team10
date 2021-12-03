from django.http import HttpResponse, HttpResponseNotAllowed
import json
import re
import operator
from django.http.response import HttpResponseBadRequest, JsonResponse
from json.decoder import JSONDecodeError
from django.forms.models import model_to_dict

from work.models import Work
from review.models import Review, ReviewUserLike
from tag.models import Tag
from user.models import UserTagFav
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt

from django.db.models import Q

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
    user_class = get_user_model()

    try:
        work = Work.objects.get(id = id)
    except Work.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        reviews = Review.objects.filter(work = id)
        response_dict = []

        request_user = request.user
        if not request_user.is_authenticated:
            clickedLikeReview = False

        for review in reviews:
            work = Work.objects.get(id=review.work_id)
            work_artist_name = [artist.name for artist in work.artists.all()]
            work_dict = {
                "id": work.id, "title": work.title, "thumbnail_picture": work.thumbnail_picture,
                "platform_id": work.platform_id, "year": work.year, "artists": work_artist_name
            }
            author = user_class.objects.get(id=review.author_id)
            author_dict = {
                "id": author.id, "username": author.username, "email": author.email, # "profile_picture": author.profile_picture
            }

            if request_user.is_authenticated and ReviewUserLike.objects.filter(user = request_user, review = review):
                clickedLikeReview = True
            else:
                clickedLikeReview = False
            
            response_dict.append({
                "id": review.id, "title": review.title, "content": review.content, "score": review.score, "likes": review.likes,
                "work": work_dict, "author": author_dict, "clickedLike": clickedLikeReview
            })
        
        return JsonResponse({ "reviews": response_dict }, status=200, safe = False)


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
    request_user = request.user
    if request.method == 'GET':
        if request_user.is_authenticated:
            tag_list = [Tag.objects.get(id=tag['id']) for tag in request_user.user_tag.all().values()]
            
            tag_based_work = list(map(lambda work: {'title': work['title'], 'thumbnail_picture': work['thumbnail_picture'],
            'description': work['description'], 'year': work['year'], 'link': work['link'],
            'completion': work['completion'], 'score_avg': work['score_avg'], 'review_num': work['review_num'],
            'platform_id': work['platform_id'],
            'artists': [artist.name for artist in Work.objects.get(title=work['title']).artists.all()],
            'id': work['id']}, [work for work in Work.objects.filter(tags__in=tag_list).values()]))

            review_list = [Review.objects.get(id=review['id']) for review in Review.objects.filter(author=request_user).values()]
            review_list.reverse()
            review_list = review_list[:5]

            tag_dic = {}
            for review in review_list:  
                for tag in review.work.tags.all():
                    try:
                        tag_dic[tag.id] += 1
                    except:
                        tag_dic[tag.id] = 1
            
            sorted_tag_list = list(sorted(tag_dic.items(), key=operator.itemgetter(0), reverse=True))[:3]
            tag_list = [Tag.objects.get(id=tag[0]) for tag in sorted_tag_list[0:1]]

            review_based_work = list(map(lambda work: {'title': work['title'], 'thumbnail_picture': work['thumbnail_picture'],
            'description': work['description'], 'year': work['year'], 'link': work['link'],
            'completion': work['completion'], 'score_avg': work['score_avg'], 'review_num': work['review_num'],
            'platform_id': work['platform_id'],
            'artists': [artist.name for artist in Work.objects.get(title=work['title']).artists.all()],
            'id': work['id']}, [work for work in Work.objects.filter(tags__in=tag_list).values()]))

            return JsonResponse([tag_based_work, review_based_work], status=200, safe=False)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])

def work_search(request):  # TODO
    if request.method == 'GET':
        keyword = request.GET.get('q', None)
        keytag = request.GET.get('tags', None)
        
        return_work_list = [[], []]
        if keyword == '' and keytag == '':
            return JsonResponse(return_work_list, safe=False)
        
        tag_list = [Tag.objects.get(name=tagname) for tagname in keytag.split('$')[1:]]
        tag_filtered_work = Work.objects
        for tag in tag_list:
            tag_filtered_work = tag_filtered_work.filter(tags__in=[tag]).distinct()

        if len(tag_list) == 0:
            work_title_list = [work for work in Work.objects.filter(Q(title__contains=keyword)).values()]
            work_artist_list = [work for work in Work.objects.filter(Q(artists__name__contains=keyword)).values()]
        else:
            work_title_list = [work for work in tag_filtered_work.filter(Q(title__contains=keyword)).values()]
            work_artist_list = [work for work in tag_filtered_work.filter(Q(artists__name__contains=keyword)).values()]

        return_work_list[0] = list(map(lambda work: {'title': work['title'], 'thumbnail_picture': work['thumbnail_picture'],
        'description': work['description'], 'year': work['year'], 'link': work['link'],
        'completion': work['completion'], 'score_avg': work['score_avg'], 'review_num': work['review_num'],
        'platform_id': work['platform_id'],
        'artists': [artist.name for artist in Work.objects.get(title=work['title']).artists.all()],
        'id': work['id']}, work_title_list))

        return_work_list[1] = list(map(lambda work: {'title': work['title'], 'thumbnail_picture': work['thumbnail_picture'],
        'description': work['description'], 'year': work['year'], 'link': work['link'],
        'completion': work['completion'], 'score_avg': work['score_avg'], 'review_num': work['review_num'],
        'platform_id': work['platform_id'],
        'artists': [artist.name for artist in Work.objects.get(title=work['title']).artists.all()],
        'id': work['id']}, work_artist_list))
        
        return JsonResponse(return_work_list, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])
