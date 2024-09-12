from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from customAuth.views import authTest, LogoutView, LoginView
from books.views import BookAPIList

urlpatterns = [
    # admin
    path('admin/', admin.site.urls),

    # auth
    path('api/v1/login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView, name='logout'),

    # social auth - oauth
    path('api/v1/authtest/', authTest),
    path('', include('social_django.urls', namespace='social')),

    # jwt
    path('api/v1/token/create/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # main
    path('api/v1/booklist/', BookAPIList.as_view(), name='books'),
]
