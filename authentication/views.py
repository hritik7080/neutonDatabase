from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import UserSerializer, LoginSerializer
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.contrib import auth
import jwt
from django.contrib.auth.models import User
from . import models
from databaseApp import models as main_model
# Create your views here.


class RegisterView(GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = UserSerializer(data={
            'username': request.POST['username'],
            'first_name': request.POST['first_name'],
            'last_name': request.POST['last_name'],
            'email': request.POST['email'],
            'password': request.POST['password'],
        })
        if serializer.is_valid():
            serializer.save()
            details = main_model.UserDetails(user=User.objects.get(
                username=request.POST['username']), profession=request.POST['profession'])
            details.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        data = request.data
        username = data.get('username', '')
        password = data.get('password', '')
        user = auth.authenticate(username=username, password=password)

        if user:
            auth_token = jwt.encode(
                {'username': user.username, 'emial': user.email, 'first_name': user.first_name, 'last_name': user.last_name, 'profession': main_model.UserDetails.objects.get(user__username=user.username).profession}, settings.JWT_SECRET_KEY)

            serializer = UserSerializer(user)

            data = {'token': auth_token}
            obj = models.IssuedTokens(user=user)
            obj.save()
            data['user']['professsion'] = main_model.UserDetails.objects.get(
                user__username=serializer.data['username']).profession

            return Response(data, status=status.HTTP_200_OK)

            # SEND RES
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(GenericAPIView):

    def post(self, request, *args, **kwargs):

        models.IssuedTokens.objects.get(token=request.POST['token']).delete()
        return Response({'result': "logged out"}, status=status.HTTP_200_OK)


class ValidateToken(GenericAPIView):
    def get(self, request, *args, **kwargs):
        try:

            username = jwt.decode(request.GET.get("token"),
                                settings.JWT_SECRET_KEY)['username']
            print(username)
            if models.IssuedTokens.objects.filter(user__username=username).exists():
                return Response({'result': 'Autherized'}, status=status.HTTP_200_OK)
            else:
                return Response({'result': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'result': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
