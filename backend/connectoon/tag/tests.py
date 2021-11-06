from django.test import TestCase, Client
from .models import Tag

class TagTestCase(TestCase):
    def setUp(self):
        Tag.objects.create(name="horror")

    def test_tag_count(self):
        self.assertEqual(Tag.objects.all().count(), 1)

    def test_tag_search(self):
        client = Client()
        response = client.get('/tags/search/')
