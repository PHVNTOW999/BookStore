import uuid

from rest_framework import serializers
from books.models import Book
from customAuth.serializer import UserSerializer


class BookSerializer(serializers.ModelSerializer):
    wished = serializers.SerializerMethodField('_wished')
    inBasket = serializers.SerializerMethodField('_inBasket')

    def userCheck(self):
        return self.context['request'].user

    def _wished(self, value):
        if self.userCheck().is_authenticated:
            wishlist = UserSerializer(self.userCheck()).data['wishlist']

            if wishlist:
                for book in wishlist:
                    if value.uuid == uuid.UUID(book['uuid']):
                        return True

    def _inBasket(self, value):
        if self.userCheck().is_authenticated:
            basket = UserSerializer(self.userCheck()).data['basket']

            if basket:
                for book in basket:
                    if value.uuid == uuid.UUID(book['uuid']):
                        return True

    class Meta:
        model = Book
        depth = 1
        fields = ['uuid', 'title', 'desc', 'preview', 'genres', 'inBasket', 'wished', 'authors']
