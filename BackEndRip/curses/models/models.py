from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth import models as user_models
from django.contrib.auth.models import PermissionsMixin
from django.utils import timezone


class UserManager(BaseUserManager):
    def _create_user(self, username, password, is_superuser, **extra_fields):
        now = timezone.now()
        user = self.model(
            username=username,
            is_superuser=is_superuser,
            last_login=now,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, password, **extra_fields):
        return self._create_user(username, password, False, **extra_fields)

    def create_superuser(self, username, password, **extra_fields):
        user = self._create_user(username, password, True, **extra_fields)
        user.is_staff = True
        user.is_superuser = True
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
    name = models.CharField(max_length=20, verbose_name="Имя пользователя")
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    is_admin = models.BooleanField(default=False)

    @property
    def is_staff(self):
        return self.is_admin

    objects = UserManager()

    class Meta:
        managed = True
        db_table = 'users'

    @is_staff.setter
    def is_staff(self, value):
        self._is_staff = value


class Purchase(models.Model):
    id = models.IntegerField(primary_key=True)
    id_user = models.IntegerField(verbose_name="ID пользователя, купившего курс")
    id_curse = models.IntegerField(verbose_name="ID курса, который купил пользователь")
    date_purchase = models.DateField(verbose_name="Дата покупки")
    sum = models.IntegerField(verbose_name="Сумма покупки")
