from curses.models.models import Curses, Users, Purchase
from rest_framework import serializers


class CursesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Curses
        fields = ["id", "title", "description", "category", "image", "price", "rate", "count"]


class UsersSerializers(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["id", "nickname", "email", "name", "age"]


class PurchaseSerializers(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = ["id", "id_user", "id_curse", "date_purchase", "sum"]