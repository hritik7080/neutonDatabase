# Generated by Django 3.1.4 on 2021-02-10 19:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('databaseApp', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Mappings',
        ),
        migrations.RenameField(
            model_name='trackroots',
            old_name='_id',
            new_name='sid',
        ),
    ]
