from django.test import TestCase, Client
from .models import Review

class ReviewTestCase(TestCase):
  def setUp(self):
    Review.objects.create(work_id=1, score = 0.0, title = "DUM", content="DUM_CONTENT", updated_at ="")
  
  def test_review_count(self):
    self.assertEqual(Review.objects.all().count(), 1)

  def test_review_id(self):
    client = Client()
    response = client.get('reviews/1/')

    self.assertEqual(response.status_code, 501)

  def test_review_board(self):
    client = Client()
    response = client.get('reviews/board/')

    self.assertEqual(response.status_code, 501)
