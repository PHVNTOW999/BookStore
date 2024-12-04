from django.contrib.auth import get_user_model
from django.http import JsonResponse
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from books.models import Book
from books.serializer import BookSerializer


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


class NewsListView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Book.objects.all().order_by('-created_at')

    serializer_class = BookSerializer
