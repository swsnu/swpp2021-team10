from django.test import TestCase
from .models import Work

class WorkTestCase(TestCase):
  def setUp(self):
    Work.objects.create(title = 'DummyTitle')
  
  def test_work_title(self):
    self.assertEqual(Work.objects.all().count(), 1)

# Create your tests here.
