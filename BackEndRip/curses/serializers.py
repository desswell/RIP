from curses.models.models import Curses, User, Purchase
from rest_framework import serializers
from django_filters import rest_framework as filters


class CursesFilter(filters.FilterSet):
    price = filters.RangeFilter()

    class Meta:
        model = Curses
        fields = ['price']


class UserFilter(filters.FilterSet):
    username = filters.CharFilter()

    class Meta:
        model = User
        fields = ['username']


class PurchaseFilter(filters.FilterSet):
    id_user = filters.CharFilter()
    id_curse = filters.CharFilter()

    class Meta:
        model = Purchase
        fields = ['id_user', 'id_curse']


class CursesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Curses
        fields = ["id", "title", "description", "category", "image", "price", "rate", "count"]


class UsersSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "is_staff"]


class PurchaseSerializers(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = ["id", "id_user", "id_curse", "date_purchase", "sum", "status", "date_status"]
