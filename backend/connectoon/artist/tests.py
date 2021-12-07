from django.test import TestCase, Client
import json
from .models import Artist

class ArtistTestCase(TestCase):
    def setUp(self):
        Artist.objects.create(name="Dummy")

    def test_artist_count(self):
        self.assertEqual(Artist.objects.all().count(), 1)

    def test_csrf_token(self):
        client = Client(enforce_csrf_checks=True)

        response = client.get('/api/v1/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

# Create your tests here.
