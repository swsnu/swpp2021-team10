import json

from django.contrib.auth import get_user_model
from django.test import TestCase, Client

from tag.models import Tag
from user.models import UserTagFav

User = get_user_model()


class TokenTestCase(TestCase):
    def test_csrf(self):
        client = Client(enforce_csrf_checks=True)
        response = client.delete('/users/')
        self.assertEqual(response.status_code, 403)  # Request without csrf token returns 403 response

        response = client.get('/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.delete('/users/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_csrf_not_allowed(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/token/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)


class UserTestCase(TestCase):
    def setUp(self):
        tag1 = Tag.objects.create(name='tag1')
        tag2 = Tag.objects.create(name='tag2')
        tag3 = Tag.objects.create(name='tag3')

        user1 = User.objects.create_user(email='test1@snu.ac.kr', username='test1', password='qwe123')

        UserTagFav.objects.create(user=user1, tag=tag1)

    def test_user_register(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/users/',
                               json.dumps({'email': 'test2@snu.ac.kr', 'username': 'test2', 'password': 'qwe123',
                                           'tags': [1, 2]}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(UserTagFav.objects.count(), 3)

        response = client.post('/users/',
                               json.dumps({'email': 'test3@snu.ac.kr', 'username': 'test3', 'password': 'qwe123',
                                           'tags': []}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), 3)
        self.assertEqual(UserTagFav.objects.count(), 3)

        response = client.post('/users/',
                               json.dumps({'emal': 'test2@snu.ac.kr', 'usename': 'test2', 'password': 'qwe123',
                                           'tgs': [1, 2]}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        response = client.post('/users/',
                               json.dumps({'email': 'test2@snu.ac.kr', 'username': 'test2', 'password': 'qwe123',
                                           'tags': [1, 5]}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

    def test_user_login(self):
        client = Client(enforce_csrf_checks=True)

        # Check KeyError
        csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/users/login/',
                               json.dumps({'emal': 'test1@snu.ac.kr', 'password': 'qwe123'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        # Check email wrong
        csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/users/login/',
                               json.dumps({'email': 'tes1@snu.ac.kr', 'password': 'qwe123'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # Check password wrong
        csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/users/login/',
                               json.dumps({'email': 'test1@snu.ac.kr', 'password': 'qe123'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # Check Successful Login
        csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/users/login/',
                               json.dumps({'email': 'test1@snu.ac.kr', 'password': 'qwe123'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        # Check Not Allowed
        csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.get('/users/login/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_user_id(self):
        client = Client()
        response = client.get('/users/1/')

        self.assertEqual(response.status_code, 501)

    def test_user_me(self):
        client = Client(enforce_csrf_checks=True)

        # Check Not Logged in
        csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.get('/users/me/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # Login
        csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/users/login/',
                               json.dumps({'email': 'test1@snu.ac.kr', 'password': 'qwe123'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        # Check Successful User me
        csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.get('/users/me/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)

        # Check Not Allowed
        csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/users/me/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

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
            User.objects.create_superuser(email='veldic33@user.com', password='qwe123', username='veldic3',
                                          is_superuser=False)
        with self.assertRaises(ValueError):
            User.objects.create_superuser(email='veldic33@user.com', password='qwe123', username='veldic3',
                                          is_staff=False)
