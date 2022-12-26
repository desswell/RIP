from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

from curses import views as curses_view
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'curses', curses_view.CursesView)
router.register(r'User', curses_view.UsersView)
router.register(r'Purchase', curses_view.PurchaseView)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('api/Purchase/add/', curses_view.create_purchase, name='create-purchase'),
    path('api/curses/change/', curses_view.changeCurses, name="change-curses"),
    path('api/curses/delete/', curses_view.deleteCurses, name="delete-curses"),
    path('api/curses/upload/', curses_view.create_curses),
    # path('api/curses/getForUser/', curses_view.getUserCurses),
    path('api/authorize/', curses_view.AuthView.as_view(), name="auth"),
    path('api/user/create', curses_view.create_user, name="create-user"),
    path('api/logout/', curses_view.logout, name="logout"),
    path('api/Purchase/delete/', curses_view.deletePurchase, name='delete-purchase'),
    path('api/Purchase/changeStatus/', curses_view.changePurchase, name='change-purchase'),
    path('api/curses/delete', curses_view.deleteCurses, name="delete-curses")
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
