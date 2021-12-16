from django.core import validators
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Tag(models.Model):
    name = models.CharField(max_length=30)
    related = models.ManyToManyField('self', related_name="tags")
    prior = models.BooleanField(default=False)
