from django.contrib import admin
from django.urls import path
from bmstu_lab import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.GetAnimes, name='main_url'),
    path('anime/<int:id>/', views.GetAnime, name='anime_url'),
]

# urlpatterns = [
#     path('', views.animeList),
#     path('anime/<int:id>/', views.GetAnime1, name='anime_url'),
#     path('admin/', admin.site.urls)
#     ]