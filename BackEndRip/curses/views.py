from rest_framework import viewsets
from curses.serializers import CursesSerializers, UsersSerializers, PurchaseSerializers
from curses.models.models import Curses, Users, Purchase


class CursesView(viewsets.ModelViewSet):
    queryset = Curses.objects.all().order_by('id')
    serializer_class = CursesSerializers


class UsersView(viewsets.ModelViewSet):
    queryset = Users.objects.all().order_by('id')
    serializer_class = UsersSerializers


class PurchaseView(viewsets.ModelViewSet):
    queryset = Purchase.objects.all().order_by('id')
    serializer_class = PurchaseSerializers