from django.urls import path

from . import views

urlpatterns = [
    path('<int:id>/', views.review_id, name='review_id'),
    path('board/', views.review_board, name='review_board'),
]
