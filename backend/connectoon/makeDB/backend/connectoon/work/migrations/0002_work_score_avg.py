# Generated by Django 3.2.5 on 2021-11-10 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('work', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='work',
            name='score_avg',
            field=models.FloatField(default=0),
        ),
    ]