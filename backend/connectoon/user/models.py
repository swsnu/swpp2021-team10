from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

from tag.models import Tag
from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    username = models.TextField(max_length=30)
    email = models.EmailField(_('email address'), unique=True)
    profile_picture = models.URLField()
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class UserTagFav(models.Model):
    user = models.ForeignKey(CustomUser, related_name='user_tag', on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, related_name='user_tag', on_delete=models.CASCADE)
