from databaseApp.models import Feedbacks
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
    path('resourceAction/', views.ResourceActions.as_view(), name='resource-like'),
    path('feedback/', views.FeedbackView.as_view(), name='feedback'),
    path('checkEmail/', views.EmailCheck.as_view(), name='email-check'),
    path('checkUsername/', views.UsernameCheck.as_view(), name='username-check'),
    path('searchTrack/', views.SearchTrack.as_view(), name='search-track'),
    path('searchResource/', views.SearchResource.as_view(), name='search-track'),
    path('userDetails/', views.AdditionalUserDetailsView.as_view(), name='additional-user-details')
]
