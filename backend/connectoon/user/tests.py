import io
import json
from urllib.parse import urlencode

from PIL import Image
from django.contrib.auth import get_user_model
from django.test import TestCase, Client

from tag.models import Tag
from user.models import UserTagFav
from work.models import Work
from review.models import Review

user_class = get_user_model()


class TokenTestCase(TestCase):
    def test_csrf(self):
        client = Client(enforce_csrf_checks=True)
        response = client.delete('/api/v1/users/')
        self.assertEqual(response.status_code, 403)  # Request without csrf token returns 403 response

        response = client.get('/api/v1/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.delete('/api/v1/users/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_csrf_not_allowed(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/v1/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/api/v1/token/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)


class UserTestCase(TestCase):
    def setUp(self):
        tag1 = Tag.objects.create(name='tag1')
        tag2 = Tag.objects.create(name='tag2')
        tag3 = Tag.objects.create(name='tag3')

        user1 = user_class.objects.create_user(email='test1@snu.ac.kr', username='test1', password='qwe123')

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
        response = client.get('/api/v1/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/api/v1/users/',
                               urlencode({'email': 'test2@snu.ac.kr', 'username': 'test2', 'password': 'qwe123',
                                          'tags': ['tag1', 'tag2']}, True),
                               content_type='application/x-www-form-urlencoded', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(user_class.objects.count(), 2)
        self.assertEqual(UserTagFav.objects.count(), 3)

        # Check duplicated username not create
        response = client.post('/api/v1/users/',
                               urlencode({'email': 'test4@snu.ac.kr', 'username': 'test2', 'password': 'qwe123',
                                           'tags': ['tag1', 'tag2']}, True),
                               content_type='application/x-www-form-urlencoded', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(user_class.objects.count(), 2)
        self.assertEqual(UserTagFav.objects.count(), 3)

        # Check without image
        response = client.post('/api/v1/users/',
                               urlencode({'email': 'test3@snu.ac.kr', 'username': 'test3', 'password': 'qwe123',
                                           'tags': []}, True),
                               content_type='application/x-www-form-urlencoded', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(user_class.objects.count(), 3)
        self.assertEqual(UserTagFav.objects.count(), 3)

        # Check with image
        # response = client.post('/api/v1/users/',
        #                        urlencode({'email': 'test4@snu.ac.kr', 'username': 'test4', 'password': 'qwe123',
        #                                   'tags': [], 'profile_picture': self.generate_photo_file()}, True),
        #                        content_type='application/x-www-form-urlencoded', HTTP_X_CSRFTOKEN=csrftoken)
        # self.assertEqual(response.status_code, 201)
        # self.assertEqual(User.objects.count(), 4)
        # self.assertEqual(UserTagFav.objects.count(), 3)

        response = client.post('/api/v1/users/',
                               urlencode({'emal': 'test2@snu.ac.kr', 'usename': 'test2', 'password': 'qwe123',
                                           'tgs': ['tag1', 'tag2']}, True),
                               content_type='application/x-www-form-urlencoded', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        response = client.post('/api/v1/users/',
                               urlencode({'email': 'test2@snu.ac.kr', 'username': 'test2', 'password': 'qwe123',
                                           'tags': ['tag1', 'tag5']}, True),
                               content_type='application/x-www-form-urlencoded', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

    def test_user_dup(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/v1/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        # Check duplicated email
        response = client.post('/api/v1/users/dup/email/',
                               json.dumps({'email': 'test1@snu.ac.kr'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        response = client.post('/api/v1/users/dup/email/',
                               json.dumps({'emal': 'test2@snu.ac.kr'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        response = client.post('/api/v1/users/dup/email/',
                               json.dumps({'email': 'test4@snu.ac.kr'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/v1/users/dup/email/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # Check duplicated username
        response = client.post('/api/v1/users/dup/username/',
                               json.dumps({'username': 'test1'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        response = client.post('/api/v1/users/dup/username/',
                               json.dumps({'userame': 'test1'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        response = client.post('/api/v1/users/dup/username/',
                               json.dumps({'username': 'test4'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        response = client.get('/api/v1/users/dup/username/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_user_login(self):
        client = Client(enforce_csrf_checks=True)

        # Check KeyError
        csrftoken = client.get('/api/v1/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/api/v1/users/login/',
                               json.dumps({'emal': 'test1@snu.ac.kr', 'password': 'qwe123'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        # Check email wrong
        csrftoken = client.get('/api/v1/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/api/v1/users/login/',
                               json.dumps({'email': 'tes1@snu.ac.kr', 'password': 'qwe123'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # Check password wrong
        csrftoken = client.get('/api/v1/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/api/v1/users/login/',
                               json.dumps({'email': 'test1@snu.ac.kr', 'password': 'qe123'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # Check Successful Login
        csrftoken = client.get('/api/v1/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/api/v1/users/login/',
                               json.dumps({'email': 'test1@snu.ac.kr', 'password': 'qwe123'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)

        # Check Not Allowed
        csrftoken = client.get('/api/v1/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.get('/api/v1/users/login/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_user_logout(self):
         client = Client(enforce_csrf_checks=True)

         # Check Successful Login & Logout
         csrftoken = client.get('/api/v1/token/').cookies['csrftoken'].value  # Get csrf token from cookie
         response = client.post('/api/v1/users/login/',
                                json.dumps({'email': 'test1@snu.ac.kr', 'password': 'qwe123'}),
                                content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
         response = client.get('/api/v1/users/logout/')
         self.assertEqual(response.status_code, 200)

         # Check Not Allowed
         response = client.get('/api/v1/users/logout/')
         self.assertEqual(response.status_code, 401)

         # Check Not Allowed
         csrftoken = client.get('/api/v1/token/').cookies['csrftoken'].value  # Get csrf token from cookie
         response = client.post('/api/v1/users/logout/', HTTP_X_CSRFTOKEN=csrftoken)
         self.assertEqual(response.status_code, 405)

    def test_user_id(self):
        client = Client()
        response = client.get('/api/v1/users/1/')

        self.assertEqual(response.status_code, 501)

    def test_user_me_get(self):
        client = Client(enforce_csrf_checks=True)

        # Check Not Logged in
        csrftoken = client.get('/api/v1/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.get('/api/v1/users/me/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        # Login
        csrftoken = client.get('/api/v1/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/api/v1/users/login/',
                               json.dumps({'email': 'test1@snu.ac.kr', 'password': 'qwe123'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)

        # Check Successful User me
        csrftoken = client.get('/api/v1/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.get('/api/v1/users/me/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)

        # Check Not Allowed
        csrftoken = client.get('/api/v1/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/api/v1/users/me/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_user_me_put(self):
        client = Client()

        # Check Not Logged in
        response = client.put('/api/v1/users/me/')
        self.assertEqual(response.status_code, 401)

        # Login
        response = client.post('/api/v1/users/login/',
                               json.dumps({'email': 'test1@snu.ac.kr', 'password': 'qwe123'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # Check only username change
        response = client.put('/api/v1/users/me/',
                               urlencode({'username': 'test2', 'tags': ['tag1']}, True),
                               content_type='application/x-www-form-urlencoded')
        self.assertEqual(response.status_code, 200)

        # Check only tag change
        response = client.put('/api/v1/users/me/',
                              urlencode({'tags': ['tag1', 'tag2']}, True),
                              content_type='application/x-www-form-urlencoded')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(UserTagFav.objects.count(), 2)

        response = client.put('/api/v1/users/me/',
                              urlencode({'tags': []}, True),
                              content_type='application/x-www-form-urlencoded')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(UserTagFav.objects.count(), 0)

        # Check tag not appropriate
        response = client.put('/api/v1/users/me/',
                              urlencode({'tags': ['tag1', 'tag5']}, True),
                              content_type='application/x-www-form-urlencoded')
        self.assertEqual(response.status_code, 400)

        # Check change password
        response = client.put('/api/v1/users/me/',
                              urlencode({'password': 'qwe1234', 'tags': ['tag1', 'tag2']}, True),
                              content_type='application/x-www-form-urlencoded')
        self.assertEqual(response.status_code, 200)

        # Fail Login
        response = client.post('/api/v1/users/login/',
                               json.dumps({'email': 'test1@snu.ac.kr', 'password': 'qwe123'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 401)

        # Success Login
        response = client.post('/api/v1/users/login/',
                               json.dumps({'email': 'test1@snu.ac.kr', 'password': 'qwe1234'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # Check Not Allowed
        response = client.post('/api/v1/users/me/')
        self.assertEqual(response.status_code, 405)

    def test_user_me_review(self):
        user_class = get_user_model()
        author = user_class.objects.create_user(
            email='dummy@user.com', password='1234', username='dummy1')
        author2 = user_class.objects.create_user(
            email='dummy2@user.com', password='1234', username='dummy2')
        Work.objects.create(
            title='DummyTitle', year=2019, description="HI", 
            link="https://www.naver.com/",completion=True, platform_id=1, review_num = 2, score_sum = 5.0, score_avg = 2.5
        )
        Work.objects.create(
            title='DummyTitle2', year=2020, description="HI2", 
            link="https://www.naver.com/",completion=False, platform_id=3, review_num = 0, score_sum = 0.0, score_avg = 0.0
        )
        Review.objects.create(
            work=Work.objects.first(), score=0.0, title="DUM", content="DUM_CONTENT", author=author
        )
        Review.objects.create(
            work=Work.objects.first(), score=0.0, title="DUM1", content="DUM_CONTENT1", author=author
        )
        Review.objects.create(
            work=Work.objects.first(), score=5.0, title="DUMMY2", content="DUMMY_CONTENT2", author=author2
        )
        client = Client()
        response = client.get('/api/v1/users/me/reviews/', {'requestReviews[]': ['[0, 2]']}, content_type='application/json')

        self.assertEqual(response.status_code, 200)

        response = client.post('/api/v1/users/me/reviews/', {})
        self.assertEqual(response.status_code, 405)
        response = client.put('/api/v1/users/me/reviews/', {})
        self.assertEqual(response.status_code, 405)
        response = client.delete('/api/v1/users/me/reviews/')
        self.assertEqual(response.status_code, 405)

        csrftoken = client.get('/api/v1/token/').cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/api/v1/users/login/',
                               json.dumps({'email': 'dummy@user.com', 'password': '1234'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)

        response = client.get('/api/v1/users/me/reviews/', {'requestReviews[]': ['[0, 1]']}, content_type='application/json')
        response_json = json.loads(response.content.decode())
        self.assertEqual(len(response_json['reviews']), 1)


        response = client.post('/api/v1/reviews/1/like/')

        response = client.get('/api/v1/users/me/reviews/', {'requestReviews[]': ['[0, 24]']}, content_type='application/json')
        response_json = json.loads(response.content.decode())['reviews']

        for review in response_json:
            self.assertEqual(review['author']['id'], author.id)
            if review['id'] == 1:
                self.assertEqual(review['clickedLike'], True)
            else:
                self.assertEqual(review['clickedLike'], False)



class UsersManagersTests(TestCase):

    def test_create_user(self):
        user = user_class.objects.create_user(email='veldic@user.com', password='qwe123', username='veldic')
        self.assertEqual(user.email, 'veldic@user.com')
        self.assertEqual(user.username, 'veldic')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertEqual(user.__str__(), 'veldic@user.com')

        superuser = user_class.objects.create_superuser(email='veldic2@user.com', password='qwe123', username='veldic2')
        self.assertEqual(superuser.email, 'veldic2@user.com')
        self.assertEqual(superuser.username, 'veldic2')
        self.assertTrue(superuser.is_active)
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)

        with self.assertRaises(TypeError):
            user_class.objects.create_user()
        with self.assertRaises(TypeError):
            user_class.objects.create_user(email='')
        with self.assertRaises(ValueError):
            user_class.objects.create_user(email='', password="qwe123")
        with self.assertRaises(ValueError):
            user_class.objects.create_user(email='veldicc@user.com', password="qwe123")
        with self.assertRaises(ValueError):
            user_class.objects.create_user(email='', password="foo", username='veldic')

        with self.assertRaises(ValueError):
            user_class.objects.create_superuser(email='veldic33@user.com', password='qwe123', username='veldic3',
                                          is_superuser=False)
        with self.assertRaises(ValueError):
            user_class.objects.create_superuser(email='veldic33@user.com', password='qwe123', username='veldic3',
                                          is_staff=False)
