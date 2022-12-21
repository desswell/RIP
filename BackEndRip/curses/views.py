import curses

from django.utils import timezone
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView
from curses.serializers import CursesSerializers, UsersSerializers, PurchaseSerializers, CursesFilter, UserFilter, \
    PurchaseFilter
from curses.models.models import Curses, User, Purchase
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import authenticate
from django.http import HttpResponse
import redis
import uuid


class CursesView(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,)
    queryset = Curses.objects.all().order_by('id')
    serializer_class = CursesSerializers
    filterset_class = CursesFilter


class UsersView(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,)
    queryset = User.objects.all().order_by("id")
    serializer_class = UsersSerializers
    filterset_class = UserFilter


class PurchaseView(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,)
    queryset = Purchase.objects.all().order_by('id')
    serializer_class = PurchaseSerializers
    filterset_class = PurchaseFilter


session_storage = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT)


@api_view(["POST"])
def create_user(request):
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    u = User.objects.create_user(username=username, password=password)
    if u is not None:
        return HttpResponse("{\"status\": \"ok\"}", content_type='json')
    else:
        return HttpResponse("{\"status\": \"error\", \"error\": \"user creation failed\"}", content_type='json')

@api_view(["POST"])
def create_purchase(request):
    data = json.loads(request.body)
    ssid = request.COOKIES.get("session_cookie")
    curse_id = data["id_curse"]
    sum = data["sum"]
    if ssid is not None:
        user = User.objects.get(username=session_storage.get(request.COOKIES.get('session_cookie')).decode())
        p = Purchase.objects.create(id_curse=curse_id, id_user=user.id, sum=sum)
        response = Response("{\"status\": \"ok\"}", content_type="json")
        return response
    else:
        return HttpResponse("{\"status\": \"error\", \"error\": \"haven't been added to purchase\"}")

@api_view(["GET"])
def logout(request):
    ssid = request.COOKIES.get("session_cookie")
    if ssid is not None:
        session_storage.delete(ssid)
        return Response(status=status.HTTP_200_OK, data="{\"status\": \"successfully logged out\"}")
    else:
        return Response(status=status.HTTP_204_NO_CONTENT)


class AuthView(APIView):
    def post(self, request):
        data = json.loads(request.body)
        username = data["username"]
        password = data["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            key = str(uuid.uuid4())
            session_storage.set(key, username)
            u = User.objects.get(username=username)
            u.last_login = timezone.now()
            u.save()
            response = Response("{\"status\": \"ok\"}", content_type='json')
            response.set_cookie("session_cookie", key)
            return response
        else:
            return Response("{\"status\": \"error\", \"error\": \"login failed\"}")