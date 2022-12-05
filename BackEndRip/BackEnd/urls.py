from django.contrib import admin
from curses import views as curses_view
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'curses', curses_view.CursesView)
router.register(r'Users', curses_view.UsersView)
router.register(r'Purchase', curses_view.PurchaseView)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
]
