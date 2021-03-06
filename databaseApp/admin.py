from django.contrib import admin
from databaseApp import models
# Register your models here.

admin.site.register(models.TrackRoots)
admin.site.register(models.TrackNodes)
admin.site.register(models.Mappings)
admin.site.register(models.Resources)