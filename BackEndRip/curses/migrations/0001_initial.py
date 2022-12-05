# Generated by Django 4.1.3 on 2022-11-29 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Curses',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=30, verbose_name='Название курса')),
                ('description', models.CharField(max_length=100, verbose_name='Описание курса')),
                ('category', models.CharField(max_length=30, verbose_name='Категория курса')),
                ('image', models.CharField(max_length=100, verbose_name='Ссылка на картинку')),
                ('price', models.IntegerField(verbose_name='Цена курса')),
                ('rate', models.DecimalField(decimal_places=2, max_digits=2, verbose_name='Рейтинг курса')),
                ('count', models.IntegerField(verbose_name='Количество оценок')),
            ],
        ),
        migrations.CreateModel(
            name='Purchase',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('id_user', models.IntegerField(verbose_name='ID пользователя, купившего курс')),
                ('id_curse', models.IntegerField(verbose_name='ID курса, который купил пользователь')),
                ('date_purchase', models.DateField(verbose_name='Дата покупки')),
                ('sum', models.IntegerField(verbose_name='Сумма покупки')),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('nickname', models.CharField(max_length=20, verbose_name='Никнейм')),
                ('emal', models.CharField(max_length=30, verbose_name='Email пользователя')),
                ('name', models.CharField(max_length=20, verbose_name='Имя пользователя')),
                ('age', models.IntegerField(verbose_name='Возраст пользователя')),
            ],
        ),
    ]