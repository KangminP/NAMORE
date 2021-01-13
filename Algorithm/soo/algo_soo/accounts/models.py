from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.validators import validate_comma_separated_integer_list
# from django.contrib.auth.models import User

class Ingredient(models.Model):
    ingre_name = models.CharField(max_length=100)


class RealUser(AbstractUser):
    GENDER_MALE = "male"
    GENDER_FEMALE = "female"
    GENDER_OTHER = "other"

    GENDER_CHOICES=(
        (GENDER_MALE,"Male"),
        (GENDER_FEMALE,"Female"),
        (GENDER_OTHER,"Other"),
    )

    user_gender = models.CharField(choices=GENDER_CHOICES, max_length=10, blank=True)
    user_age = models.IntegerField(default=1)
    user_refri = models.ManyToManyField(Ingredient, related_name='user_refri', blank=True)
    user_likeIngre = models.ManyToManyField(Ingredient, related_name='user_likeIngre', blank=True)
    user_hateIngre = models.ManyToManyField(Ingredient, related_name='user_hateIngre', blank=True)

class OrderImgContent(models.Model):
    order_image = models.CharField(max_length=200, blank=True)
    order_content = models.CharField(max_length=200)


class OrderIngre(models.Model):
    order_ingre = models.CharField(max_length=100)


class Recipe(models.Model):
    recipe_name = models.CharField(max_length=100)
    recipe_image = models.TextField()
    recipe_intro = models.TextField()
    # order_id = models.ForeignKey(Order, on_delete=models.CASCADE)
    order_img_content = models.ManyToManyField(OrderImgContent, related_name='recipe_order_img_content')
    order_ingre = models.ManyToManyField(OrderIngre, related_name='recipe_order_ingre')


class Rank(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    rank_difficulty = models.IntegerField(default=0)
    rank_flavor = models.IntegerField(default=0)
    rank_clean = models.IntegerField(default=0)
    rank_reuse = models.IntegerField(default=0)


class RecipeComment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    comment_content = models.TextField()
    comment_create = models.DateTimeField(auto_now_add=True)
    comment_edit = models.DateTimeField(auto_now=True)

