from django.contrib import admin
from .models import Anime_title
from .models import Comments
admin.site.register([Anime_title, Comments])