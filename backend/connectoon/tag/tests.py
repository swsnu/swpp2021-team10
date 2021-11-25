from django.test import TestCase, Client
import json
from .models import Tag

class TagTestCase(TestCase):
    def setUp(self):
        Tag.objects.create(name="horror", prior=True)
        Tag.objects.create(name="fantasy", prior=False)

    def test_tag_count(self):
        self.assertEqual(Tag.objects.all().count(), 2)

    def test_tag_search(self):
        client = Client(enforce_csrf_checks=True)

        response = client.get('/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.delete('/tags/search/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        Tag.objects.first().related.add(Tag.objects.get(name="fantasy"))

        response = client.get('/tags/search/?q=hor')
        self.assertEqual(response.status_code, 200)
