# Generated by Django 3.2.6 on 2021-11-06 13:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_usertagfav'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile_picture',
            field=models.URLField(null=True),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='username',
            field=models.TextField(blank=True, max_length=30),
        ),
    ]
