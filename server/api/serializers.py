# from django.utils import 
from rest_framework import serializers
from .models import Item,Post, PopularDestination,UserPost,Comments,PostLikes
from django.contrib.auth.models import User


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields=('__all__')

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('__all__')

class PopularDestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopularDestination
        fields = ('__all__')

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

class UserPostSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username') 
    class Meta:
        model= UserPost
        fields = ('__all__')

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username') 
    class Meta:
        model= Comments
        fields = ('__all__')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model= PostLikes
        fields =('__all__')