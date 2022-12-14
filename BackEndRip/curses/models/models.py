from django.db import models


class Curses(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=30, verbose_name="Название курса")
    description = models.CharField(max_length=100, verbose_name="Описание курса")
    category = models.CharField(max_length=30, verbose_name="Категория курса")
    image = models.ImageField(upload_to='images/', verbose_name="Картинка")
    price = models.IntegerField(verbose_name="Цена курса")
    rate = models.CharField(max_length=20, verbose_name="Рейтинг курса")
    count = models.IntegerField(verbose_name="Количество оценок")


class Users(models.Model):
    id = models.IntegerField(primary_key=True)
    nickname = models.CharField(max_length=20, verbose_name="Никнейм")
    email = models.CharField(max_length=30, verbose_name="Email пользователя")
    name = models.CharField(max_length=20, verbose_name="Имя пользователя")
    age = models.IntegerField(verbose_name="Возраст пользователя")


class Purchase(models.Model):
    id = models.IntegerField(primary_key=True)
    id_user = models.IntegerField(verbose_name="ID пользователя, купившего курс")
    id_curse = models.IntegerField(verbose_name="ID курса, который купил пользователь")
    date_purchase = models.DateField(verbose_name="Дата покупки")
    sum = models.IntegerField(verbose_name="Сумма покупки")
