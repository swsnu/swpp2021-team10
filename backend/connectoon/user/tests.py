from django.contrib.auth import get_user_model
from django.test import TestCase, Client

class UserTestCase(TestCase):
  def test_user_register(self):
    client = Client()
    response = client.get('/users/')

    self.assertEqual(response.status_code, 501)

  def test_user_login(self):
    client = Client()
    response = client.get('/users/login/')

    self.assertEqual(response.status_code, 501)

  def test_user_id(self):
    client = Client()
    response = client.get('/users/1/')

    self.assertEqual(response.status_code, 501)

  def test_user_me(self):
    client = Client()
    response = client.get('/users/me/')

    self.assertEqual(response.status_code, 501)

  def test_user_me_review(self):
    client = Client()
    response = client.get('/users/me/reviews/')

    self.assertEqual(response.status_code, 501)

  class UsersManagersTests(TestCase):

    def test_create_user(self):
      User = get_user_model()
      user = User.objects.create_user(email='veldic@user.com', password='qwe123', username='veldic')
      self.assertEqual(user.email, 'veldic@user.com')
      self.assertEqual(user.username, 'veldic')
      self.assertTrue(user.is_active)
      self.assertFalse(user.is_superuser)

      with self.assertRaises(TypeError):
        User.objects.create_user()
      with self.assertRaises(TypeError):
        User.objects.create_user(email='')
      with self.assertRaises(TypeError):
        User.objects.create_user(email='', password="qwe123")
      with self.assertRaises(ValueError):
        User.objects.create_user(email='', password="foo", username='veldic')
