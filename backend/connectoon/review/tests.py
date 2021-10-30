from django.test import TestCase
from .models import Review

class ReviewTestCase(TestCase):
  def setUp(self):
    Review.objects.create(work_id=1, score = 0.0, title = "DUM", content="DUM_CONTENT", updated_at ="")
  
  def test_review_count(self):
    self.assertEqual(Review.objects.all().count(), 1)

# Create your tests here.