from django.contrib.auth import get_user_model
from django.test import TestCase, Client


class TokenTestCase(TestCase):
  def test_csrf(self):
    client = Client(enforce_csrf_checks=True)
    response = client.delete('/users/')
    self.assertEqual(response.status_code, 403)  # Request without csrf token returns 403 response

    response = client.get('/token/')
    csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

    response = client.delete('/users/', HTTP_X_CSRFTOKEN=csrftoken)
    self.assertEqual(response.status_code, 501)  # TODO : change into 405 when /user/register/ is implemented

  def test_csrf_not_allowed(self):
    client = Client(enforce_csrf_checks=True)
    response = client.get('/token/')
    csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

    response = client.post('/token/', HTTP_X_CSRFTOKEN=csrftoken)
    self.assertEqual(response.status_code, 405)


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
    self.assertFalse(user.is_staff)
    self.assertFalse(user.is_superuser)
    self.assertEqual(user.__str__(), 'veldic@user.com')

    superuser = User.objects.create_superuser(email='veldic2@user.com', password='qwe123', username='veldic2')
    self.assertEqual(superuser.email, 'veldic2@user.com')
    self.assertEqual(superuser.username, 'veldic2')
    self.assertTrue(superuser.is_active)
    self.assertTrue(superuser.is_staff)
    self.assertTrue(superuser.is_superuser)

    with self.assertRaises(TypeError):
      User.objects.create_user()
    with self.assertRaises(TypeError):
      User.objects.create_user(email='')
    with self.assertRaises(ValueError):
      User.objects.create_user(email='', password="qwe123")
    with self.assertRaises(ValueError):
      User.objects.create_user(email='veldicc@user.com', password="qwe123")
    with self.assertRaises(ValueError):
      User.objects.create_user(email='', password="foo", username='veldic')

    with self.assertRaises(ValueError):
      User.objects.create_superuser(email='veldic33@user.com', password='qwe123', username='veldic3',is_superuser=False)
    with self.assertRaises(ValueError):
      User.objects.create_superuser(email='veldic33@user.com', password='qwe123', username='veldic3', is_staff=False)


