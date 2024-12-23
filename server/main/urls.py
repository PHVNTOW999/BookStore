from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # admin
    path('admin/', admin.site.urls),

    # auth
    path('api/v1/auth/', include('customAuth.urls', namespace='auth')),
    path('api/v1/oauth/', include('social_django.urls', namespace='social')),

    # books
    path('api/v1/books/', include('books.urls', namespace='books')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
