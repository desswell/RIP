# Generated by Django 4.1.3 on 2022-12-07 09:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('curses', '0003_alter_curses_rate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='curses',
            name='image',
            field=models.ImageField(upload_to='', verbose_name='Ссылка на картинку'),
        ),
    ]
