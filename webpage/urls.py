from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    re_path(r'^track', TemplateView.as_view(template_name='index.html')),
    re_path(r'^course', TemplateView.as_view(template_name='index.html')),
    
    # re_path(r'^(?P<path>.*)/$', TemplateView.as_view(template_name="index.html")),
]
