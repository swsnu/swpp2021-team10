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
