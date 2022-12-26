import datetime

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
    status = "Куплен"
    if ssid is not None:
        user = User.objects.get(username=session_storage.get(request.COOKIES.get('session_cookie')).decode())
        Purchase.objects.create(id_curse=curse_id, id_user=user.id, sum=sum, status=status)
        response = Response("{\"status\": \"ok\"}", content_type="json")
        return response
    else:
        return HttpResponse("{\"status\": \"error\", \"error\": \"haven't been added to purchase\"}")


@api_view(["POST"])
def create_curses(request):
    data = json.loads(request.body)
    title = data["title"]
    price = data["price"]
    image = data['image']
    description = data["description"]
    ssid = request.COOKIES.get("session_cookie")
    if ssid is not None:
        user = User.objects.get(username=session_storage.get(request.COOKIES.get('session_cookie')).decode())
        if user.is_superuser:
            Curses.objects.create(title=title, description=description, price=price, image=image, category="JS",
                                  rate=4.3, count=200)
            response = Response("{\"status\": \"ok\"}", content_type="json")
        else:
            response = Response("{\"status\": \"access denied\"}", content_type="json")
    else:
        response = Response("{\"status\": \"you have to logIn\"}", content_type="json")
    return response


@api_view(["GET"])
def logout(request):
    ssid = request.COOKIES.get("session_cookie")
    if ssid is not None:
        session_storage.delete(ssid)
        return Response(status=status.HTTP_200_OK, data="{\"status\": \"successfully logged out\"}")
    else:
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["DELETE"])
def deletePurchase(request):
    data = json.loads(request.body)
    curse_id = data['id_curse']
    user_id = data['id_user']
    ssid = request.COOKIES.get("session_cookie")
    if ssid is not None:
        user = User.objects.get(username=session_storage.get(ssid).decode())
        if user.is_superuser:
            Purchase.objects.filter(id_curse=curse_id, id_user=user_id).delete()
            response = Response("{\"status\": \"ok\"}", content_type="json")
        else:
            response = Response("{\"status\": \"access denied\"}", content_type="json")
    else:
        response = Response("{\"status\": \"You have to logIn\"}", content_type="json")
    return response


@api_view(["DELETE"])
def deleteCurses(request):
    data = json.loads(request.body)
    curse_id = data['id_curse']
    ssid = request.COOKIES.get("session_cookie")
    print(ssid)
    if ssid is not None:
        user = User.objects.get(username=session_storage.get(ssid).decode())
        if user.is_superuser:
            Curses.objects.filter(id=curse_id).delete()
            response = Response("{\"status\": \"ok\"}", content_type="json")
        else:
            response = Response("{\"status\": \"access denied\"}", content_type="json")
    else:
        response = Response("{\"status\": \"You have to logIn\"}", content_type="json")
    return response


@api_view(["PUT"])
def changePurchase(request):
    data = json.loads(request.body)
    ssid = request.COOKIES.get("session_cookie")
    id_curse = data["id_curse"]
    id_user = data["id_user"]
    status = data["status"]
    current_date = datetime.date.today()
    if ssid is not None:
        user = User.objects.get(username=session_storage.get(ssid).decode())
        if user.is_superuser:
            Purchase.objects.filter(id_user=id_user, id_curse=id_curse).update(status=status, date_status=current_date)
            response = Response("{\"status\": \"ok\"}", content_type="json")
        else:
            Purchase.objects.filter(id_user=user.id, id_curse=id_curse).update(status=status, date_status=current_date)
            response = Response("{\"status\": \"ok\"}", content_type="json")
    else:
        response = Response("{\"status\": \"You have to logIn\"}", content_type="json")
    return response


@api_view(["PUT"])
def changeCurses(request):
    data = json.loads(request.body)
    ssid = request.COOKIES.get("session_cookie")
    id = data["id"]
    title = data["title"]
    description = data["description"]
    price = data["price"]
    if ssid is not None:
        user = User.objects.get(username=session_storage.get(ssid).decode())
        if user.is_superuser == 1:
            Curses.objects.filter(id=id).update(title=title, description=description, price=int(price))
            response = Response("{\"status\": \"ok\"}", content_type="json")
        else:
            response = Response("{\"status\": \"access denied\"}", content_type="json")
    else:
        response = Response("{\"status\": \"you have to logIn\"}", content_type="json")
    return response


# @api_view(["GET"])
# def getUserCurses(request):
#     ssid = request.COOKIES.get("session_cookie")
#     if ssid is not None:
#         user = User.objects.get(username=session_storage.get(ssid).decode())
#         p = Purchase.objects.filter(id_user=user.id)
#         queryset = []
#         for i in p:
#             queryset.append(Curses.objects.get(id=i.id_curse))
#         return Response(queryset, content_type="json")
#     else:
#         return Response("{\"status\": \"you have to logIn\"}", content_type="json")


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
