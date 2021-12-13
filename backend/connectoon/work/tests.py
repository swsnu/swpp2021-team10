from urllib.parse import urlencode
from django.db.models.expressions import F

from django.test import TestCase, Client
from django.forms.models import model_to_dict
from django.core import serializers
from .models import Work
from review.models import Review
from tag.models import Tag
from django.contrib.auth import get_user_model
import json

class WorkTestCase(TestCase):
    def setUp(self):
        user_class = get_user_model()
        author = user_class.objects.create_user(
            email='dummy@user.com', password='1234', username='dummy1')
        author2 = user_class.objects.create_user(
            email='dummy2@user.com', password='1234', username='dummy2')
        Work.objects.create(
            title='DummyTitle', year=2019, description="HI", 
            link="https://www.naver.com/",completion=True, platform_id=1, review_num = 2, score_sum = 5.0, score_avg = 2.5
        )
        Work.objects.create(
            title='DummyTitle2', year=2020, description="HI2", 
            link="https://www.naver.com/",completion=False, platform_id=3, review_num = 0, score_sum = 0.0, score_avg = 0.0
        )
        Review.objects.create(
            work=Work.objects.first(), score=0.0, title="DUM", content="DUM_CONTENT", author=author
        )
        Review.objects.create(
            work=Work.objects.first(), score=5.0, title="DUMMY2", content="DUMMY_CONTENT2", author=author2
        )
        Tag.objects.create(
            name="Dummy"
        )
        


    def test_work_count(self):
        self.assertEqual(Work.objects.all().count(), 2)

    def test_work_id(self):
        client = Client()
        response = client.get('/api/v1/works/1/')
        self.assertEqual(response.status_code, 200)

        self.assertIn("DummyTitle", response.content.decode())
        self.assertIn("2019", response.content.decode())
        self.assertIn("HI", response.content.decode())
        self.assertIn("https://www.naver.com/", response.content.decode())

    def test_work_id_not_exist(self):
        client = Client()
        response = client.get('/api/v1/works/10/')
        self.assertEqual(response.status_code, 404)
        
    def test_article_wrong_api(self):
        client = Client()
        response = client.delete('/api/v1/works/1/')

        self.assertEqual(response.status_code, 405)
        self.assertIn("GET", response.headers['Allow'])

        response = client.post('/api/v1/works/1/', {})

        self.assertEqual(response.status_code, 405)
        self.assertIn("GET", response.headers['Allow'])


        response = client.put('/api/v1/works/1/', {})

        self.assertEqual(response.status_code, 405)
        self.assertIn("GET", response.headers['Allow'])

    def test_work_id_review_not_exist(self):
        client = Client()
        response = client.get('/api/v1/works/10/reviews/')
        self.assertEqual(response.status_code, 404)

    def test_get_work_id_review(self):
        client = Client()
        response = client.get('/api/v1/works/1/reviews/')

        self.assertIn('DUM', response.content.decode())
        self.assertIn('DUM_CONTENT', response.content.decode())
        self.assertIn('DUMMY2', response.content.decode())
        self.assertIn('DUMMY_CONTENT2', response.content.decode())
        self.assertIn('0.0', response.content.decode())
        self.assertIn('5.0', response.content.decode())

        self.assertEqual(2, len(json.loads(response.content.decode())['reviews']))

        self.assertEqual(response.status_code, 200)

        response = client.get('/api/v1/works/1/reviews/')
        self.assertEqual(False, json.loads(response.content.decode())['reviews'][0]['clickedLike'])

        csrftoken = client.get('/api/v1/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/api/v1/users/login/',
                               json.dumps({'email': 'dummy@user.com', 'password': '1234'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.post('/api/v1/reviews/1/like/')

        response = client.get('/api/v1/works/1/reviews/')
        self.assertEqual(True, json.loads(response.content.decode())['reviews'][0]['clickedLike'])
       

    def test_post_work_id_review(self):
        client = Client()
        #client.login(email='dummy@user.com', password='1234', username='dummy')
        
        csrftoken = client.get('/api/v1/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/api/v1/users/login/',
                               json.dumps({'email': 'dummy@user.com', 'password': '1234'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)


        review = Review(score=3.0, title="DUM", content="DUM_CONTENT")
        review_json = model_to_dict(review)
        response = client.post('/api/v1/works/1/reviews/', review_json, content_type='application/json')

        self.assertEqual(response.status_code, 201)
        self.assertIn("DUM", response.content.decode())
        self.assertIn("DUM_CONTENT", response.content.decode())
        self.assertIn("3", response.content.decode())
    
    def test_post_work_id_review_not_logged_in(self):
        client = Client()
        
        review = Review(score=3.0, title="DUM", content="DUM_CONTENT")
        review_json = model_to_dict(review)
        response = client.post('/api/v1/works/1/reviews/', review_json, content_type='application/json')

        self.assertEqual(response.status_code, 401)
    
    def test_post_work_id_review_json_error(self):
        client = Client()
        #client.login(email='dummy@user.com', password='1234', username='dummy')

        csrftoken = client.get('/api/v1/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/api/v1/users/login/',
                               json.dumps({'email': 'dummy@user.com', 'password': '1234'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)


        review = {"score1": 3.0, "title":"DUM", "content":"DUM_CONTENT"}
        response = client.post('/api/v1/works/1/reviews/', review, content_type='application/json')

        self.assertEqual(response.status_code, 400)
    
    def test_work_id_review_wrong_api(self):
        client = Client()
        response = client.delete('/api/v1/works/1/reviews/')

        self.assertEqual(response.status_code, 405)
        self.assertIn("GET, POST", response.headers['Allow'])

        review = Review(score=3.0, title="DUM", content="DUM_CONTENT")
        review_json = model_to_dict(review)
        response = client.put('/api/v1/works/1/reviews/', review_json, content_type='application/json')

        self.assertEqual(response.status_code, 405)
        self.assertIn("GET, POST", response.headers['Allow'])

    def test_get_work_main_status(self):
        client = Client()
        response = client.get('/api/v1/works/main/')
        self.assertEqual(response.status_code, 200)
        
    def test_get_work_main_most_reviewed(self):
        client = Client()
        response = client.get('/api/v1/works/main/')

        response_json = json.loads(response.content.decode())
        self.assertEquals(response_json['worklists'][0]['title'], "Most reviewed works")

        most_reviewed_works = json.loads(response_json['worklists'][0]['works'])

        self.assertEquals(1, most_reviewed_works[0]['id'])
        self.assertEquals(2, most_reviewed_works[1]['id'])
        
    def test_get_work_main_highest_rated(self):
        client = Client()
        response = client.get('/api/v1/works/main/')

        response_json = json.loads(response.content.decode())
    
        self.assertEquals(response_json['worklists'][1]['title'], "Highest rated works")

        most_reviewed_works = json.loads(response_json['worklists'][1]['works'])

        for i in range(len(most_reviewed_works)):
            if i!=0:
                self.assertGreaterEqual(most_reviewed_works[i-1]['score_avg'], most_reviewed_works[i]['score_avg'])

    def test_get_work_wrong_api(self):
        client = Client()

        response = client.delete('/api/v1/works/main/')
        self.assertEqual(response.status_code, 405)
        self.assertIn("GET", response.headers['Allow'])

        response = client.post('/api/v1/works/main/', {})
        self.assertEqual(response.status_code, 405)
        self.assertIn("GET", response.headers['Allow'])

        response = client.put('/api/v1/works/main/', {})
        self.assertEqual(response.status_code, 405)
        self.assertIn("GET", response.headers['Allow'])

    def test_work_recommend(self):
        client = Client()
        response = client.get('/api/v1/works/recommend/')
        self.assertEqual(response.status_code, 401)

        Work.objects.first().tags.add(Tag.objects.first())

        csrftoken = client.get('/api/v1/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/api/v1/users/login/',
                               json.dumps({'email': 'dummy@user.com', 'password': '1234'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.get('/api/v1/works/recommend/')
        self.assertEqual(response.status_code, 200)

        csrftoken = client.get('/api/v1/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/api/v1/works/recommend/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_work_search(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/v1/works/search/?q=&tags=')
        response = client.get('/api/v1/works/search/?q=Du&tags=')
        response = client.get('/api/v1/works/search/?q=Du&tags=$Dummy')
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/v1/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/v1/works/search/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_work_image_id_not_exist(self):
        client = Client()
        response = client.get('/api/v1/works/10/image/')
        self.assertEqual(response.status_code, 404)
        
    def test_work_image_wrong_api(self):
        client = Client()
        response = client.delete('/api/v1/works/1/image/')

        self.assertEqual(response.status_code, 405)
