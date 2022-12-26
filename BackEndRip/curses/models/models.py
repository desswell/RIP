from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth import models as user_models
from django.contrib.auth.models import PermissionsMixin
from django.utils import timezone


class UserManager(BaseUserManager):
    def _create_user(self, username, password, is_superuser, is_staff, **extra_fields):
        now = timezone.now()
        user = self.model(
            username=username,
            is_superuser=is_superuser,
            is_staff=is_staff,
            last_login=now,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, password, **extra_fields):
        return self._create_user(username, password, False, False, **extra_fields)

    def create_superuser(self, username, password, **extra_fields):
        user = self._create_user(username, password, True, True, **extra_fields)
        user.save(using=self._db)
        return user


class Curses(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=30, verbose_name="Название курса")
    description = models.CharField(max_length=100, verbose_name="Описание курса")
    category = models.CharField(max_length=30, verbose_name="Категория курса")
    image = models.ImageField(upload_to='images/', verbose_name="Картинка")
    price = models.IntegerField(verbose_name="Цена курса")
    rate = models.CharField(max_length=20, verbose_name="Рейтинг курса")
    count = models.IntegerField(verbose_name="Количество оценок")


class User(user_models.AbstractBaseUser, PermissionsMixin):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=20, verbose_name="Никнейм", unique=True)
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    is_admin = models.BooleanField(default=False)
    objects = UserManager()

    class Meta:
        managed = True
        db_table = 'users'


class Purchase(models.Model):
    id = models.IntegerField(primary_key=True)
    id_user = models.IntegerField(verbose_name="ID пользователя, купившего курс")
    id_curse = models.IntegerField(verbose_name="ID курса, который купил пользователь")
    date_purchase = models.DateField(auto_now=True, verbose_name="Дата покупки")
    sum = models.IntegerField(verbose_name="Сумма покупки")
    status = models.CharField(max_length=20, verbose_name="Статус", default='Куплен')
    date_status = models.DateField(verbose_name="Время статуса", auto_now=True)
