from django.test import TestCase, Client
import json

from .models import Work
from artist.models import Artist

class WorkTestCase(TestCase):
    def setUp(self):
        Artist.objects.create(name="Dummy")
        Artist.objects.create(name="Dummy2")
        Work.objects.create(title='DummyTitle', year=2019, description="HI", link="https://www.naver.com/",
                            completion=True, platform_id=1,
                            )
        work = Work.objects.get(title="DummyTitle")
        work.artists.add(Artist.objects.get(name="Dummy"))
        work.artists.add(Artist.objects.get(name="Dummy2"))
        work.save()

    def test_work_count(self):
        self.assertEqual(Work.objects.all().count(), 1)

    def test_work_id(self):
        client = Client(enforce_csrf_checks=True)

        response = client.get('/works/1/')
        self.assertEqual(response.status_code, 501)

    def test_work_id_review(self):
        client = Client()
        response = client.get('/works/1/reviews/')

        self.assertEqual(response.status_code, 501)

    def test_work_main(self):
        client = Client()
        response = client.get('/works/main/')

        self.assertEqual(response.status_code, 501)

    def test_work_recommend(self):
        client = Client()
        response = client.get('/works/recommend/')

        self.assertEqual(response.status_code, 501)

    def test_work_search(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/works/search/?q=')
        response = client.get('/works/search/?q=Du')
        self.assertEqual(response.status_code, 200)

        response = client.get('/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/works/search/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 501)
