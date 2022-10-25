from django.db import models


class Stock(models.Model):
    company_name = models.CharField(max_length=50, verbose_name="Название компании")
    price = models.DecimalField(max_digits=8, decimal_places=2, verbose_name="Цена курса")
    count_videos = models.IntegerField(verbose_name="Кол-во видео в курсе")
    language = models.CharField(max_length=20, verbose_name="Язык курса, на котором преподают")
    Online = models.BooleanField(verbose_name="Онлайн курсы?")
    tutors_count = models.IntegerField(verbose_name="Кол-во тьюторов на курсе")
    date_modified = models.DateTimeField(auto_now=True, verbose_name="Когда последний раз обновлялось значение акции?")