# Generated by Django 3.1.4 on 2021-03-03 13:37

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('databaseApp', '0004_auto_20210211_0037'),
    ]

    operations = [
        migrations.AddField(
            model_name='trackroots',
            name='juniors',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=500), null=True, size=None),
        ),
    ]