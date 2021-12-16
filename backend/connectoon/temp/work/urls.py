from django.urls import path

from . import views

urlpatterns = [
    path('<int:id>/', views.work_id, name='work_id'),
    path('<int:id>/reviews/', views.work_id_review, name='work_id_review'),
    path('main/', views.work_main, name='work_main'),
    path('recommend/', views.work_recommend, name='work_recommend'),
    path('search/', views.work_search, name='work_search'),
    path('<int:id>/image/', views.work_image, name='work_image'),
]
