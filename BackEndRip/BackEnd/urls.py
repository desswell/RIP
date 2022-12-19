from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

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
    path('api/account/create/', curses_view.create_user, name="create_user"),
    # path('api/logout/', curses_view.logout_view, name="logout"),
    path('api/authorize/', curses_view.AuthView.as_view(), name="auth"),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
