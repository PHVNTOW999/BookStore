from django.contrib import admin
from django.urls import path, include, re_path
from customAuth.views import auth

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', auth),
    re_path('', include('social_django.urls', namespace='social'))
]
