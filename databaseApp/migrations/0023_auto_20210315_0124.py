# Generated by Django 3.1.4 on 2021-03-14 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('databaseApp', '0022_auto_20210314_0108'),
    ]

    operations = [
        migrations.AddField(
            model_name='tracknodes',
            name='likes',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='tracknodes',
            name='views',
            field=models.IntegerField(default=0),
        ),
    ]