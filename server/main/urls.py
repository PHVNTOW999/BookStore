from django.contrib import admin
from django.urls import path, include
from books.views import BookAPIList

urlpatterns = [
    # admin
    path('admin/', admin.site.urls),

    # auth
    path('api/v1/auth/', include('customAuth.urls', namespace='auth')),
    path('api/v1/oauth/', include('social_django.urls', namespace='social')),

    # main
    path('api/v1/booklist/', BookAPIList.as_view(), name='books'),

]
