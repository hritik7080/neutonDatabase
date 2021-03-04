from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('',views.NewTrack.as_view(), name='new-track'),
    path('addNode/', views.NewNode.as_view(), name='add-node'),
    path('getTrack/', views.GetTrack.as_view(), name='get-track'),
]
