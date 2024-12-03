from rest_framework import serializers
from customAuth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        depth = 1
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}}
