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

        response = client.get('/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

    def test_post_artist(self):
        client = Client(enforce_csrf_checks=True)

        response = client.get('/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.get('/artists/')
        self.assertEqual(response.status_code, 501)  #fails(501)

# Create your tests here.
