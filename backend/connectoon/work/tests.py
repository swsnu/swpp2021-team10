from django.test import TestCase, Client
from .models import Work

class WorkTestCase(TestCase):
  def setUp(self):
    Work.objects.create(title = 'DummyTitle', year=2019, description="HI", link="https://www.naver.com/",
    completion=True, platform_id=1,
    )
  
  def test_work_count(self):
    self.assertEqual(Work.objects.all().count(), 1)

  def test_work_id(self):
    client = Client()
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
    client = Client()
    response = client.get('/works/search/')

    self.assertEqual(response.status_code, 501)
