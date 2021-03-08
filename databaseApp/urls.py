from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('',views.NewTrack.as_view(), name='new-track'),
    path('addNode/', views.NewNode.as_view(), name='add-node'),
    path('getTrack/', views.GetTrack.as_view(), name='get-track'),
    path('resource/', views.ResourcesView.as_view(), name='get-resource'),
    path('getTrackMeta/', views.GetMetaView.as_view(), name='get-meta'),
    path('trackAction/', views.TrackLikes.as_view(), name='likes'),
    path('resourceAction/', views.ResourceActions.as_view(), name='resource-like')
]
