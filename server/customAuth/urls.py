from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from customAuth.views import LogoutView, Login, Register, Current, OauthLogin, test

app_name = 'auth'

urlpatterns = [
    # auth
    path('register/', Register, name='register'),
    path('login/', Login, name='login'),
    path('logout/', LogoutView, name='logout'),
    path('current/', Current, name='current'),

    # social auth - oauth
    path('oauthLogin/', OauthLogin, name='oauthLogin'),
    path('test/', test, name='test'),

    # jwt
    path('token/create/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
