from django.contrib import admin
from curses.models import models


@admin.register(models.Curses)
class CursesAdmin(admin.ModelAdmin):
    list_display = ["title", "image"]