from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import DateTimeField

from work.models import Work

class Review(models.Model):
  work_id = models.ForeignKey(Work, on_delete=models.CASCADE)
  #author_id = models.ForeignKey(, on_delete=models.CASCADE)
  score = models.FloatField()        #decimal?
  likes = models.IntegerField(default=0)
  title = models.CharField(max_length=200)
  content = models.TextField()
  updated_at = models.DateTimeField(auto_now_add=True)
# Create your models here.
