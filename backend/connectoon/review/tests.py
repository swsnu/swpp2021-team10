from django.test import TestCase, Client
from work.models import Work
from .models import Review


class ReviewTestCase(TestCase):
  def setUp(self):
    Work.objects.create(title = 'DummyTitle', year=2019, description="HI", link="https://www.naver.com/",
      completion=True, platform_id=1,
    )
    Review.objects.create(work_id = Work.objects.first(), score = 0.0, title = "DUM", content="DUM_CONTENT", updated_at ="")
  
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
