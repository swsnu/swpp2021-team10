from django.test import TestCase, Client
from work.models import Work
from .models import Review
from django.contrib.auth import get_user_model
import json



class ReviewTestCase(TestCase):
    def setUp(self):
        user_class = get_user_model()
        author = user_class.objects.create_user(
            email='dummy@user.com', password='1234', username='dummy')
        author2 = user_class.objects.create_user(
            email='dummy2@user.com', password='1234', username='dummy1')
        Work.objects.create(
            title='DummyTitle', year=2019, description="HI", 
            link="https://www.naver.com/",completion=True, platform_id=1, review_num = 2, score_sum = 5.0
        )
        Work.objects.create(
            title='DummyTitle2', year=2020, description="HI2", 
            link="https://www.naver.com/",completion=False, platform_id=3, review_num = 0, score_sum = 0.0
        )
        review = Review(work=Work.objects.first(), score=0.0, title="DUM", content="DUM_CONTENT", likes=10, author=author)
        review.save()
        Review.objects.create(
            work=Work.objects.first(), score=5.0, title="DUMMY2", content="DUMMY_CONTENT2", author=author2
        )
        review = Review(work=Work.objects.first(), score=0.0, title="DUM", content="DUM_CONTENT", likes=10, author=author)

    def test_review_count(self):
        self.assertEqual(Review.objects.all().count(), 2)

    def test_get_review_id(self):
        client = Client()
        response = client.get('/reviews/1/')
        self.assertEqual(response.status_code, 200)

        self.assertIn("DUM", response.content.decode())
        self.assertIn("DUM_CONTENT", response.content.decode())
        self.assertIn("0.0", response.content.decode())
    
    def test_put_review_id(self):
        client = Client()
        
        csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/users/login/',
                               json.dumps({'email': 'dummy@user.com', 'password': '1234'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        review_json = { 'title': 'title1', 'content': 'content1', 'score': 4.0 }
        response = client.put('/reviews/1/', review_json, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertIn("title1", response.content.decode())
        self.assertIn("content1", response.content.decode())
        self.assertIn("4.0", response.content.decode())

    def test_put_work_id_review_not_logged_in(self):
        client = Client()
        
        review_json = {}
        response = client.put('/reviews/1/', review_json, content_type='application/json')

        self.assertEqual(response.status_code, 401)
    
    def test_put_work_id_review_forbidden(self):
        client = Client()

        csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/users/login/',
                               json.dumps({'email': 'dummy@user.com', 'password': '1234'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        review_json = {}
        response = client.put('/reviews/2/', review_json, content_type='application/json')

        self.assertEqual(response.status_code, 403)
    
    def test_put_work_id_review_json_error(self):
        client = Client()

        csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/users/login/',
                               json.dumps({'email': 'dummy@user.com', 'password': '1234'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        review_json = { 'title': 'title1', 'content': 'content1', 'wrong_key': 4.0 }
        response = client.put('/reviews/1/', review_json, content_type='application/json')

        self.assertEqual(response.status_code, 400)
    
    def test_delete_review_id(self):
        client = Client()

        csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/users/login/',
                               json.dumps({'email': 'dummy@user.com', 'password': '1234'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.delete('/reviews/1/')

        self.assertEqual(response.status_code, 204)

    def test_delete_review_id_to_zero(self):
        client = Client()

        csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/users/login/',
                               json.dumps({'email': 'dummy@user.com', 'password': '1234'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.delete('/reviews/1/')
        self.assertEqual(response.status_code, 204)
        response = client.delete('/reviews/2/')
        #self.assertEqual(response.status_code, 204)

    def test_delete_review_id_not_logged_in(self):
        client = Client()

        response = client.delete('/reviews/1/')

        self.assertEqual(response.status_code, 401)
    
    def test_delete_review_id_forbidden(self):
        client = Client()

        csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/users/login/',
                               json.dumps({'email': 'dummy@user.com', 'password': '1234'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.delete('/reviews/2/')

        self.assertEqual(response.status_code, 403)

    def test_review_id_wrong_api(self):
        client = Client()
        response = client.post('/reviews/1/', {})

        self.assertEqual(response.status_code, 405)
        self.assertIn("GET", response.headers['Allow'])


    def test_review_id_not_exist(self):
        client = Client()
        response = client.get('/reviews/10/')
        self.assertEqual(response.status_code, 404)

    def test_review_board(self):
        client = Client()
        response = client.get('/reviews/board/')

        self.assertEqual(response.status_code, 200)

        response_json = json.loads(response.content.decode())['reviews']

        for review in response_json:
            self.assertGreaterEqual(review['likes'], 10)

    def test_review_board_wrong_api(self):
        client = Client()
        response = client.delete('/reviews/board/')

        self.assertEqual(response.status_code, 405)
        self.assertIn("GET", response.headers['Allow'])

        response = client.post('/reviews/board/', {})

        self.assertEqual(response.status_code, 405)
        self.assertIn("GET", response.headers['Allow'])


        response = client.put('/reviews/board/', {})

        self.assertEqual(response.status_code, 405)
        self.assertIn("GET", response.headers['Allow'])
