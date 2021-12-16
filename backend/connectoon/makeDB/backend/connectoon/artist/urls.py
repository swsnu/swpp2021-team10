from django.urls import path

from . import views

urlpatterns = [
    path('', views.add_artist, name='add_artist'),
]
