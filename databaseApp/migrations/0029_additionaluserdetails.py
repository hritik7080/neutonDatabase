# Generated by Django 3.0.5 on 2021-05-01 13:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('databaseApp', '0028_auto_20210406_1514'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdditionalUserDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_pic', models.ImageField(upload_to='profilePics/')),
                ('summary', models.TextField(blank=True, max_length=10000, null=True)),
                ('phone', models.CharField(blank=True, max_length=100, null=True)),
                ('location', models.CharField(blank=True, max_length=10000, null=True)),
                ('website', models.CharField(blank=True, max_length=10000, null=True)),
                ('youtube', models.CharField(blank=True, max_length=10000, null=True)),
                ('telegram', models.CharField(blank=True, max_length=100, null=True)),
                ('discord', models.CharField(blank=True, max_length=1000, null=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
