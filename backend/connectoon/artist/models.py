from django.db import models

class Artist(models.Model):
  name: models.CharField(max_length=20)

# Create your models here.
