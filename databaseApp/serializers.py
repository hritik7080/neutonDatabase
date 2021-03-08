from django.db.models import fields
from rest_framework import serializers
from databaseApp import models


class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TrackNodes
        fields = ["selfId", "title", "desc"]

class RootSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TrackRoots
        fields = ["selfId", "title", "desc", 'likes', 'views']

class ResourcesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Resources
        fields='__all__'