import io
import json
from urllib.parse import urlencode

from PIL import Image
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

    # def generate_photo_file(self):
    #     file = io.BytesIO()
    #     image = Image.new('RGBA', size=(100, 100), color=(155, 0, 0))
    #     image.save(file, 'png')
    #     file.name = 'test.png'
    #     file.seek(0)
    #     return file

    def test_user_register(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/users/',
                               urlencode({'email': 'test2@snu.ac.kr', 'username': 'test2', 'password': 'qwe123',
                                          'tags': ['tag1', 'tag2']}, True),
                               content_type='application/x-www-form-urlencoded', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(UserTagFav.objects.count(), 3)

        # Check duplicated username not create
        response = client.post('/users/',
                               urlencode({'email': 'test4@snu.ac.kr', 'username': 'test2', 'password': 'qwe123',
                                           'tags': ['tag1', 'tag2']}, True),
                               content_type='application/x-www-form-urlencoded', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(UserTagFav.objects.count(), 3)

        # Check without image
        response = client.post('/users/',
                               urlencode({'email': 'test3@snu.ac.kr', 'username': 'test3', 'password': 'qwe123',
                                           'tags': []}, True),
                               content_type='application/x-www-form-urlencoded', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), 3)
        self.assertEqual(UserTagFav.objects.count(), 3)

        # Check with image
        # response = client.post('/users/',
        #                        {'email': 'test4@snu.ac.kr', 'username': 'test4', 'password': 'qwe123',
        #                                   'tags': [], 'profile_picture': self.generate_photo_file()},
        #                        content_type='multipart/formdata', HTTP_X_CSRFTOKEN=csrftoken)
        # self.assertEqual(response.status_code, 201)
        # self.assertEqual(User.objects.count(), 4)
        # self.assertEqual(UserTagFav.objects.count(), 3)

        response = client.post('/users/',
                               urlencode({'emal': 'test2@snu.ac.kr', 'usename': 'test2', 'password': 'qwe123',
                                           'tgs': ['tag1', 'tag2']}, True),
                               content_type='application/x-www-form-urlencoded', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        response = client.post('/users/',
                               urlencode({'email': 'test2@snu.ac.kr', 'username': 'test2', 'password': 'qwe123',
                                           'tags': ['tag1', 'tag5']}, True),
                               content_type='application/x-www-form-urlencoded', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

    def test_user_dup(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        # Check duplicated email
        response = client.post('/users/dup/email/',
                               json.dumps({'email': 'test1@snu.ac.kr'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        response = client.post('/users/dup/email/',
                               json.dumps({'emal': 'test2@snu.ac.kr'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        response = client.post('/users/dup/email/',
                               json.dumps({'email': 'test4@snu.ac.kr'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        response = client.get('/users/dup/email/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # Check duplicated username
        response = client.post('/users/dup/username/',
                               json.dumps({'username': 'test1'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        response = client.post('/users/dup/username/',
                               json.dumps({'userame': 'test1'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        response = client.post('/users/dup/username/',
                               json.dumps({'username': 'test4'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        response = client.get('/users/dup/username/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

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
        self.assertEqual(response.status_code, 200)

        # Check Not Allowed
        csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.get('/users/login/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_user_logout(self):
         client = Client(enforce_csrf_checks=True)

         # Check Successful Login & Logout
         csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
         response = client.post('/users/login/',
                                json.dumps({'email': 'test1@snu.ac.kr', 'password': 'qwe123'}),
                                content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
         response = client.get('/users/logout/')
         self.assertEqual(response.status_code, 200)

         # Check Not Allowed
         response = client.get('/users/logout/')
         self.assertEqual(response.status_code, 401)

         # Check Not Allowed
         csrftoken = client.get('/token/').cookies['csrftoken'].value  # Get csrf token from cookie
         response = client.post('/users/logout/', HTTP_X_CSRFTOKEN=csrftoken)
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
        self.assertEqual(response.status_code, 200)

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
