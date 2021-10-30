from django.test import TestCase
from .models import Tag

class TagTestCase(TestCase):
  def setUp(self):
    Tag.objects.create(name = "horror")
  
  def test_tag_count(self):
    self.assertEqual(Tag.objects.all().count(), 1)

# Create your tests here.
