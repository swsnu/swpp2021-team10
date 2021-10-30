from django.test import TestCase
from .models import Artist

class ArtistTestCase(TestCase):
  def setUp(self):
    Artist.objects.create(name = "Dummy")
  
  def test_artist_count(self):
    self.assertEqual(Artist.objects.all().count(), 1)

# Create your tests here.
