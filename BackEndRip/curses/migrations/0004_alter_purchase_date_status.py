# Generated by Django 4.1.4 on 2022-12-25 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('curses', '0003_alter_purchase_date_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchase',
            name='date_status',
            field=models.DateField(default='2006-10-25', verbose_name='Время статуса'),
        ),
    ]