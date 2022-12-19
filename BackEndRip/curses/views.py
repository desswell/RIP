from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView
from curses.serializers import CursesSerializers, UsersSerializers, PurchaseSerializers, CursesFilter
from curses.models.models import Curses, User, Purchase
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import authenticate, login
from django.http import HttpResponse


class CursesView(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,)
    queryset = Curses.objects.all().order_by('id')
    serializer_class = CursesSerializers
    filterset_class = CursesFilter


class UsersView(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UsersSerializers


class PurchaseView(viewsets.ModelViewSet):
    queryset = Purchase.objects.all().order_by('id')
    serializer_class = PurchaseSerializers


class AuthView(APIView):
    def post(self, request):
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse("{'status': 'ok'}")
        else:
            return HttpResponse("{'status': 'error', 'error': 'login failed'}")


@api_view(["POST"])
def create_user(request):
    data = json.loads(request.body)
    username = data["username"]
    password = data["password"]
    u = User.objects.create_user(username=username, password=password)
    if u is not None:
        response = Response("{\"status\": \"ok\"}", content_type="json")
        return response
    else:
        return HttpResponse("{\"status\": \"error\", \"error\": \"login failed\"}")

