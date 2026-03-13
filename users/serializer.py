from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()

#register user

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)

    class Meta:
        model = User
        fields = ['username', 'email' , 'password', 'phone']


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

# profile view serielize

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','phone','profile_picture']
        read_only_fields = ['id']   # bech el id ma yetbadalch 
        