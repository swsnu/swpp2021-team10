from django.urls import path

from . import views

urlpatterns = [
    path('', views.user_register, name='user_register'),
    path('<int:id>/', views.user_id, name='user_id'),
    path('login/', views.user_login, name='user_login'),
    path('me/', views.user_me, name='user_me'),
    path('me/reviews/', views.user_me_review, name='user_me_review'),
]
