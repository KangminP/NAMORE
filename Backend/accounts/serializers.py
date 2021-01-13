from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = RealUser
        fields = '__all__'
    
    def create(self, validated_data):
        # user = RealUser.objects.create_user(
        #     validated_data['username'], None, validated_data['password']
        # )
        user = RealUser.objects.create_user(**validated_data)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RealUser
        fields = ['password', 'email', 'user_gender', 'user_age']

    # def update(self, instance, validated_data):
    #     # instance.username = validated_data.get('username', instance.username)
    #     # instance.password = validated_data.get('password', instance.password)
    #     instance.email = validated_data.get('email', instance.email)
    #     instance.user_gender = validated_data.get('user_gender', instance.user_gender)
    #     instance.user_age = validated_data.get('user_age', instance.user_age)
    #     instance.save()
    #     return instance

    # old_password = serializers.CharField()
    # new_password = serializers.CharField()
    
    # def validate_new_password(self, value):
    #     validate_password(value)
    #     return value

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = RealUser
        fields = '__all__'


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        print(data['username'])
        print(data['password'])
        # user = authenticate(**data)
        user = authenticate(username=data['username'], password=data['password'])
        print(user)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Go to BurgerKing")


class RefriIngreSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefriIngre
        fields = ['ingre_name']


class HateIngreSerialzier(serializers.ModelSerializer):
    class Meta:
        model = HateIngre
        fields = ['ingre_name']


class LikeIngreSerialzier(serializers.ModelSerializer):
    class Meta:
        model = LikeIngre
        fields = ['ingre_name']


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'


class RecipeCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        # fields = ['pk', 'recipe_name', 'recipe_image', 'recipe_hits', 'recipe_sheep', 'recipe_time', 'recipe_difficulty']
        fields = '__all__'


class IngreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'


class RecipeCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeComment
        # fields = ['comment_content', 'comment_create', 'comment_edit']
        fields = '__all__'


class RankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rank
        fields = '__all__'


class RecipeLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['recipe_like']

class UserRankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rank
        fields = '__all__'


class UserLikeRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RealUser
        fields = ['recipe_like']