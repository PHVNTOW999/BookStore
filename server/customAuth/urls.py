from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from customAuth.views import authTest, LogoutView, LoginView, RegisterView, Check

app_name = 'auth'
urlpatterns = [
    # auth
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView, name='logout'),
    path('check/', Check, name='check'),

    # social auth - oauth
    path('authtest/', authTest),
    path('', include('social_django.urls', namespace='social')),

    # jwt
    path('token/create/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
