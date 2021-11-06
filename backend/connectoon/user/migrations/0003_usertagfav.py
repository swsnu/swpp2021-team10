# Generated by Django 3.2.6 on 2021-11-06 10:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tag', '0001_initial'),
        ('user', '0002_auto_20211106_0746'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserTagFav',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_tag', to='tag.tag')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_tag', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]