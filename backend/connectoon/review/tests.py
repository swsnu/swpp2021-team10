from django.test import TestCase, Client
from work.models import Work
from .models import Review
from django.contrib.auth import get_user_model
import json



class ReviewTestCase(TestCase):
    def setUp(self):
        User = get_user_model()
        author = User.objects.create_user(
            email='dummy@user.com', password='1234', username='dummy')
        author2 = User.objects.create_user(
            email='dummy2@user.com', password='1234', username='dummy')
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

    def test_review_count(self):
        self.assertEqual(Review.objects.all().count(), 2)

    def test_get_review_id(self):
        client = Client()
        response = client.get('/reviews/1/')
        self.assertEqual(response.status_code, 200)

        self.assertIn("DUM", response.content.decode())
        self.assertIn("DUM_CONTENT", response.content.decode())
        self.assertIn("0.0", response.content.decode())

    def test_review_id_wrong_api(self):
        client = Client()
        response = client.delete('/reviews/1/')

        self.assertEqual(response.status_code, 405)
        self.assertIn("GET", response.headers['Allow'])

        response = client.post('/reviews/1/', {})

        self.assertEqual(response.status_code, 405)
        self.assertIn("GET", response.headers['Allow'])


        response = client.put('/reviews/1/', {})

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

        response_json = json.loads(json.loads(response.content.decode())["reviews"])

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
