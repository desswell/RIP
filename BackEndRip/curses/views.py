from rest_framework import viewsets
from curses.serializers import CursesSerializers, UsersSerializers, PurchaseSerializers, CursesFilter
from curses.models.models import Curses, Users, Purchase
from django_filters.rest_framework import DjangoFilterBackend


class CursesView(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,)
    queryset = Curses.objects.all().order_by('id')
    serializer_class = CursesSerializers
    filterset_class = CursesFilter


class UsersView(viewsets.ModelViewSet):
    queryset = Users.objects.all().order_by('id')
    serializer_class = UsersSerializers


class PurchaseView(viewsets.ModelViewSet):
    queryset = Purchase.objects.all().order_by('id')
    serializer_class = PurchaseSerializers
