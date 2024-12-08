from django.http import JsonResponse
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from books.models import Book, Author, Genre
from books.serializer import BookSerializer, AuthorSerializer, GenreSerializer


# wish
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddWish(request):
    request.user.wishlist.add(request.data['book'])
    return JsonResponse(True, safe=False)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def RemoveWish(request):
    request.user.wishlist.remove(request.data['book'])
    return JsonResponse(True, safe=False)


# basket
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddBasket(request):
    request.user.basket.add(request.data['book'])
    return JsonResponse(True, safe=False)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def RemoveBasket(request):
    request.user.basket.remove(request.data['book'])
    return JsonResponse(True, safe=False)


# lists
class NewsListView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Book.objects.all().order_by('-created_at')

    serializer_class = BookSerializer


class AuthorListView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Author.objects.all()

    serializer_class = AuthorSerializer


class GenreListView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Genre.objects.all()

    serializer_class = GenreSerializer
