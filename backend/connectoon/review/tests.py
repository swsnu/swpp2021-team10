from django.test import TestCase, Client
from work.models import Work
from .models import Review
from django.contrib.auth import get_user_model


class ReviewTestCase(TestCase):
    def setUp(self):
        User = get_user_model()
        author = User.objects.create_user(
            email='dummy@user.com', password='1234', username='dummy')
        Work.objects.create(title='DummyTitle', year=2019, description="HI", link="https://www.naver.com/",
                            completion=True, platform_id=1
                            )
        Review.objects.create(work=Work.objects.first(
        ), score=0.0, title="DUM", content="DUM_CONTENT", author=author)

    def test_review_count(self):
        self.assertEqual(Review.objects.all().count(), 1)

    def test_review_id(self):
        client = Client()
        response = client.get('/reviews/1/')

        self.assertEqual(response.status_code, 501)

    def test_review_board(self):
        client = Client()
        response = client.get('/reviews/board/')

        self.assertEqual(response.status_code, 501)
