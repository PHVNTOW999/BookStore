from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from books.models import Book
from books.serializer import BookSerializer


class BookAPIList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    # permission_classes = [AllowAny]
    queryset = Book.objects.all()
    serializer_class = BookSerializer
