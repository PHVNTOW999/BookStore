from rest_framework import generics
from rest_framework.permissions import AllowAny
from books.models import Book
from books.serializer import BookSerializer


class NewsListView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Book.objects.all().order_by('-created_at')

    serializer_class = BookSerializer
