# Generated by Django 3.1.4 on 2021-03-10 10:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('databaseApp', '0018_auto_20210310_0251'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profession', models.CharField(max_length=100)),
            ],
        ),
    ]