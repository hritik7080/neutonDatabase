from django.urls import path
from .views import RegisterView, LoginView, LogoutView, ValidateToken


urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('validateToken/', ValidateToken.as_view()),
]