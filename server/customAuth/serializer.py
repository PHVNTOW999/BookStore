from rest_framework import serializers
from customAuth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        depth = 1
        fields = ['uuid', 'email', 'wishlist', 'basket']
