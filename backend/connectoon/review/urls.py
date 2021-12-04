from django.urls import path

from . import views

urlpatterns = [
    path('<int:id>/like/', views.review_like, name='review_like'),
    path('<int:id>/unlike/', views.review_unlike, name='review_unlike'),
    path('<int:id>/', views.review_id, name='review_id'),
    path('board/', views.review_board, name='review_board'),
]
