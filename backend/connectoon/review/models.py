from django.db import models
from django.db.models.deletion import CASCADE

class Review(models.Model):
  work_id = models.ForeignKey(, on_delete=models.CASCADE)
  author_id = models.ForeignKey(, on_delete=models.CASCADE)
  score = models.FloatField()           #decimal?
  likes = models.IntegerField(default=0)
  title = models.CharField(max_length=200)  #length설정
  content = models.CharField(max_length=1000) #length
  updated_at = models.DateTimeField()
# Create your models here.