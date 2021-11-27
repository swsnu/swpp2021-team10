from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import DateTimeField

from work.models import Work
from django.contrib.auth import get_user_model

class Review(models.Model):
    work = models.ForeignKey(
        Work, on_delete=models.CASCADE, related_name="review")
    author = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="review")
    score = models.FloatField()  # decimal?
    likes = models.IntegerField(default=0)
    title = models.CharField(max_length=200)
    content = models.TextField()
    updated_at = models.DateTimeField(auto_now_add=True)
# Create your models here.

class ReviewUserLike(models.Model):
    user = models.ForeignKey(get_user_model(), related_name='reviewlike', on_delete=models.CASCADE)
    review = models.ForeignKey(Review, related_name='likeuser', on_delete=models.CASCADE)