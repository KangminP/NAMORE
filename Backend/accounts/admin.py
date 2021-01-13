from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import *

# Register your models here.
admin.site.register(RealUser)
admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(OrderIngre)
admin.site.register(OrderImgContent)
admin.site.register(RefriIngre)
admin.site.register(HateIngre)
admin.site.register(LikeIngre)
admin.site.register(RecipeComment)
admin.site.register(Rank)