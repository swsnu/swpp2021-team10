from django.core import validators
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from artist.models import Artist

from tag.models import Tag


class Work(models.Model):
  title = models.CharField(max_length=200)  #length설정
  thumbnail_picture = models.URLField()     #picture link 만 있으면 되려나.?
  description = models.CharField(max_length=1000)
  year = models.IntegerField(validators =[ MinValueValidator(1900), MaxValueValidator(2100) ])
  link = models.URLField()
  completion = models.BooleanField()
  score_sum = models.FloatField(default=0)
  review_num = models.IntegerField(default=0)
  
  PLATFORM_CHOICES =[
    (1, 'Naver'),
    (2, 'Kakao'),
    (3, 'Lezhin')
  ]
  platform_id = models.IntegerField(choices= PLATFORM_CHOICES)
  tags = models.ManyToManyField(Tag, related_name="works") # 중간 table이 따로 필요없을 것 같은데 맞나요?
  artists = models.ManyToManyField(Artist, related_name="works")