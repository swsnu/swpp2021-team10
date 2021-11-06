from django.db import models
from django.db.models.base import Model

class Tag(models.Model):
    name = models.CharField(max_length=30)

# Create your models here.
