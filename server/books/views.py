from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from books.models import Book
from books.serializer import BookSerializer


class BookAPIList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Book.objects.all()
    serializer_class = BookSerializer
