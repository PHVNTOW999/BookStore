from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from customAuth.views import authTest, LogoutView, LoginView, RegisterView, Current, OauthLogin, cookieTest

app_name = 'auth'
urlpatterns = [
    # auth
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView, name='logout'),
    path('current/', Current, name='current'),

    # social auth - oauth
    path('test/', authTest, name='test'),
    path('oauthLogin/', OauthLogin, name='oauthLogin'),
    path('cookie/', cookieTest, name='testCookies'),

    # jwt
    path('token/create/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
