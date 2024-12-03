from rest_framework import serializers
from books.models import Book
from customAuth.serializer import UserSerializer


class BookSerializer(serializers.ModelSerializer):
    wished = serializers.SerializerMethodField('_wished')

    def userCheck(self):
        return self.context['request'].user

    def _wished(self, value):
        if self.userCheck().is_authenticated:
            wishlist = UserSerializer(self.userCheck()).data['wishlist']
            # if value.uuid:
            #     return value.uuid
            for book in wishlist:
                if value.uuid == book['uuid']:
                    return book
                else:
                    return False

            # wishStatus = wishlist.objects.filter=(uuid=value.uuid)
            # return UserSerializer(self.userCheck()).data
            # return wishlist
        else:
            return False

    class Meta:
        model = Book
        depth = 1
        fields = "__all__"
