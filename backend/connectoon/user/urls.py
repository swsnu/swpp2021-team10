from django.urls import path

from . import views

urlpatterns = [
    path('', views.user_register, name='user_register'),
    path('<int:id>/', views.user_id, name='user_id'),
    path('login/', views.user_login, name='user_login'),
    path('me/', views.user_me, name='user_me'),
    path('me/reviews/', views.user_me_review, name='user_me_review'),
    path('dup/email/', views.user_dup_email, name='user_dup_email'),
    path('dup/username/', views.user_dup_username, name='user_dup_username'),
]
