from django.test import TestCase, Client
from django.forms.models import model_to_dict
from django.core import serializers
from .models import Work
from review.models import Review
from django.contrib.auth import get_user_model
import json

class WorkTestCase(TestCase):
    def setUp(self):
        User = get_user_model()
        author = User.objects.create_user(
            email='dummy@user.com', password='1234', username='dummy')
        author2 = User.objects.create_user(
            email='dummy2@user.com', password='1234', username='dummy')
        Work.objects.create(
            title='DummyTitle', year=2019, description="HI", 
            link="https://www.naver.com/",completion=True, platform_id=1
        )
        Review.objects.create(
            work=Work.objects.first(), score=0.0, title="DUM", content="DUM_CONTENT", author=author
        )
        Review.objects.create(
            work=Work.objects.first(), score=5.0, title="DUMMY2", content="DUMMY_CONTENT2", author=author2
        )
        


    def test_work_count(self):
        self.assertEqual(Work.objects.all().count(), 1)

    def test_work_id(self):
        client = Client()
        response = client.get('/works/1/')
        self.assertEqual(response.status_code, 200)

        self.assertIn("DummyTitle", response.content.decode())
        self.assertIn("2019", response.content.decode())
        self.assertIn("HI", response.content.decode())
        self.assertIn("https://www.naver.com/", response.content.decode())

    def test_work_id_not_exist(self):
        client = Client()
        response = client.get('/works/2/')
        self.assertEqual(response.status_code, 404)

    def test_article_wrong_api(self):
        client = Client()
        response = client.delete('/works/1/')

        self.assertEqual(response.status_code, 405)
        self.assertIn("GET", response.headers['Allow'])

        response = client.post('/works/1/', {})

        self.assertEqual(response.status_code, 405)
        self.assertIn("GET", response.headers['Allow'])


        response = client.put('/works/1/', {})

        self.assertEqual(response.status_code, 405)
        self.assertIn("GET", response.headers['Allow'])

    def test_work_id_review_not_exist(self):
        client = Client()
        response = client.get('/works/2/reviews/')
        self.assertEqual(response.status_code, 404)

    def test_get_work_id_review(self):
        client = Client()
        response = client.get('/works/1/reviews/')

        self.assertIn('DUM', response.content.decode())
        self.assertIn('DUM_CONTENT', response.content.decode())
        self.assertIn('DUMMY2', response.content.decode())
        self.assertIn('DUMMY_CONTENT2', response.content.decode())
        self.assertIn('0.0', response.content.decode())
        self.assertIn('5.0', response.content.decode())

        self.assertEqual(2, len(json.loads(response.content.decode())))

        self.assertEqual(response.status_code, 200)

    def test_post_work_id_review(self):     #TODO: change to login
        client = Client()
        #client.login(username = 'swpp', password = 'iluvswpp')
        User = get_user_model()

        """
        author = User.objects.create_user(
            email='dummy3@user.com', password='1234', username='dummy3'
        )
        """

        review = Review(score=3.0, title="DUM", content="DUM_CONTENT")
        review_json = model_to_dict(review)
        response = client.post('/works/1/reviews/', review_json, content_type='application/json')

        self.assertEqual(response.status_code, 201)
    
    def test_post_work_id_review_not_logged_in(self):
        client = Client()
        
        review = Review(score=3.0, title="DUM", content="DUM_CONTENT")
        review_json = serializers.serialize('json', [review, ])
        response = client.post('/works/1/reviews/', review_json[0], content_type='application/json')

        self.assertEqual(response.status_code, 401)
    
    def test_work_main(self):
        client = Client()
        response = client.get('/works/main/')

        self.assertEqual(response.status_code, 501)

    def test_work_recommend(self):
        client = Client()
        response = client.get('/works/recommend/')

        self.assertEqual(response.status_code, 501)

    def test_work_search(self):
        client = Client()
        response = client.get('/works/search/')

        self.assertEqual(response.status_code, 501)
