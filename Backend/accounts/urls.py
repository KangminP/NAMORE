from django.contrib import admin
from django.conf.urls import url
from django.urls import path
from .views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/register/', RegistrationAPI.as_view()),
    path('auth/login/', LoginAPI.as_view()),
    path('auth/user/', UserAPI.as_view()),
    path('auth/user/profile/', UserProfileAPI.as_view()),
    path('recipe/', RecipeAPI.as_view()),
    path('recipe/search/', SearchRecipeAPI.as_view()),
    path('recipe/search/<str:wantName>/', BaenomSearchAPI.as_view()),
    # path('recipe/<int:recipe_pk>/like', RecipeLikeAPI.as_view()),
    path('recipe/card/', RecipeCardAPI.as_view()),
    path('recipe/<int:recipe_pk>/', RecipeDetailAPI.as_view()),
    path('ingre/', IngreAPI.as_view()),
    path('auth/refri/', RefriIngreAPI.as_view()),
    path('auth/hate/', HateIngreAPI.as_view()),
    path('auth/like/', LikeIngreAPI.as_view()),
    path('recipe/<int:recipe_pk>/comment/', RecipeCommentAPI.as_view()),
    path('recipe/<int:recipe_pk>/comment/<int:comment_pk>/',BaenomCommentAPI.as_view()),
    path('auth/comment/', UserCommentAPI.as_view()),
    path('auth/recommend_refri/', Recommend_RefriAPI.as_view()),
    path('auth/recommend_like/', Recommend_LikeAPI.as_view()),
    path('auth/recommend_hit/', Recommend_HitAPI.as_view()),
    path('auth/recommend_rank/', Recommend_RankAPI.as_view()),
    path('rank/', UserRankAPI.as_view()),
    path('rank/kangmin/<int:recipe_pk>/', KangminRankAPI.as_view()),
    path('auth/user/recipe/', UserLikeRecipeAPI.as_view()),
    path('comment/', CommentAPI.as_view()),
    path('auth/user/recipe/kangmin/', FuckRecipeAPI.as_view()),
]
