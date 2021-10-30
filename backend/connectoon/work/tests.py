from django.test import TestCase
from .models import Work

class WorkTestCase(TestCase):
  def setUp(self):
    Work.objects.create(title = 'DummyTitle', year=2019, description="HI", link="https://www.naver.com/",
    completion=True, platform_id=1,
    )
  
  def test_work_count(self):
    self.assertEqual(Work.objects.all().count(), 1)

# Create your tests here.
