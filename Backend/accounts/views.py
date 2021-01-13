from django.shortcuts import render
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from knox.models import AuthToken
from rest_framework.generics import *
from django.http import HttpResponse, JsonResponse
import json
from django.core import serializers

import numpy as np
from collections import Counter

import random

# Create your views here.


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        # user = serializer
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserProfileAPI(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(self.object, data=request.data)

        if serializer.is_valid():
            serializer.save()
            self.object.set_password(serializer.data.get("password"))
            self.object.save()

            response = {
                "user": UserSerializer(
                    self.object, context=self.get_serializer_context()
                ).data,
                # "token": AuthToken.objects.create(self.object)[1],
            }

            return Response(response)
        return Response('fuck')


class FuckRecipeAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserLikeRecipeSerializer

    def get_object(self):
        return self.request.user

    def get(self, request):
        user = self.get_object()
        serializer = UserLikeRecipeSerializer(user)
        fuck = []
        for recipe_pk in serializer.data['recipe_like']:
            recipe = Recipe.objects.get(id=recipe_pk)
            data = {
                'recipe_id': recipe_pk,
                'recipe_image': recipe.recipe_image,
                'recipe_name': recipe.recipe_name,
                'recipe_hits': recipe.recipe_hits,
                'recipe_sheep': recipe.recipe_sheep,
                'recipe_time': recipe.recipe_time,
                'recipe_difficulty': recipe.recipe_difficulty
            }
            fuck.append(data)
        return Response(fuck)


class UserLikeRecipeAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserLikeRecipeSerializer

    def get_object(self):
        return self.request.user

    def get(self, request):
        user = self.get_object()
        serializer = UserLikeRecipeSerializer(user)
        print(serializer.data['recipe_like'])
        return Response(serializer.data['recipe_like'])

    # def get_queryset(self):
    #     user = RealUser.objects.get(id=self.get_object().id)
    #     data = user.recipe_like
    #     return data

    def post(self, request):
        user = RealUser.objects.get(id=self.get_object().id)
        recipe = Recipe.objects.get(id=request.data['recipe_pk'])
        serializer = UserLikeRecipeSerializer(user)
        if recipe.pk in serializer.data['recipe_like']:
            user.recipe_like.remove(recipe)
        else:
            user.recipe_like.add(recipe)
        return Response('fuck')

    # def delete(self, request):
    #     user = RealUser.objects.get(id=self.get_object().id)
    #     recipe = Recipe.objects.get(id=request.data['recipe_pk'])
    #     user.recipe_like.remove(recipe)
    #     return Response('pika')


class KangminRankAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserRankSerializer

    def get_object(self):
        return self.request.user

    def get(self, request, recipe_pk):
        user = self.get_object()
        data = Rank.objects.filter(user=user.id, recipe=recipe_pk)
        return Response(data.values())


class UserRankAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserRankSerializer

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        return Rank.objects.all().filter(user=self.get_object().id)

    def post(self, request):
        user = self.get_object()
        Rank.objects.all().filter(
            user=user.id, recipe=request.data['recipe']).delete()
        new_rank = {
            'user': user.id,
            'recipe': request.data['recipe'],
            'rank_difficulty': request.data['ranks'][0],
            'rank_flavor': request.data['ranks'][1],
            'rank_clean': request.data['ranks'][2],
            'rank_reuse': request.data['ranks'][3],
        }
        serializer = UserRankSerializer(data=new_rank)
        print(serializer.is_valid())
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        return Response(request.data)

    def delete(self, request):
        Rank.objects.all().filter(user=self.get_object().id, recipe=0).delete()
        return Response('success')


class RecipeAPI(generics.ListAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        recipes = Recipe.objects.all()
        print(recipes[0].recipe_name)
        return recipes


class SearchRecipeAPI(generics.ListAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        recipes = Recipe.objects.all()
        return recipes

    def post(self, request):
        wantName = request.data['wantName']
        recipes = Recipe.objects.filter(recipe_name__contains=wantName)
        return Response(recipes.values())


class BaenomSearchAPI(generics.ListAPIView):
    serializer_class = RecipeSerializer

    # def get_queryset(self):
    #     recipes = Recipe.objects.all()
    #     return recipes

    def get(self, request, wantName):
        # wantName = request.data['wantName']
        recipes = Recipe.objects.filter(recipe_name__contains=wantName)
        return Response(recipes.values())


# class RecipeLikeAPI(generics.ListAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = RecipeLikeSerializer

#     def get_object(self):
#         return self.request.user

#     def post(self, request, recipe_pk):
#         recipe = Recipe.objects.get(pk=recipe_pk)
#         if self.get_object().id not in recipe.recipe_like:
#             recipe.recipe_like.append(self.get_object().id)
#         else:
#             recipe.recipe_like.remove(self.get_object().id)
#         return Response('success')


class RecipeCardAPI(generics.ListAPIView):
    serializer_class = RecipeCardSerializer

    def get_queryset(self):
        recipes = Recipe.objects.all()
        return recipes


class RecipeDetailAPI(APIView):
    def get_object(self, recipe_pk):
        return Recipe.objects.get(pk=recipe_pk)

    def get(self, request, recipe_pk):
        recipe = self.get_object(recipe_pk)
        serializer = RecipeSerializer(recipe)

        orderImgs = []
        orderContents = []
        orderIngres = []
        for i in serializer.data['order_img_content']:
            orderImgs.append(OrderImgContent.objects.get(pk=i).order_image)
            orderContents.append(
                OrderImgContent.objects.get(pk=i).order_content)
        for i in serializer.data['order_ingre']:
            orderIngres.append(OrderIngre.objects.get(pk=i).order_ingre)

        content = {
            'id': serializer.data['id'],
            'recipe_name': serializer.data['recipe_name'],
            'recipe_image': serializer.data['recipe_image'],
            'recipe_hits': serializer.data['recipe_hits'],
            'recipe_sheep': serializer.data['recipe_sheep'],
            'recipe_time': serializer.data['recipe_time'],
            'recipe_difficulty': serializer.data['recipe_difficulty'],
            'order_image': orderImgs,
            'order_content': orderContents,
            'order_ingre': orderIngres,
        }

        return Response(content)


class IngreAPI(generics.ListAPIView):
    serializer_class = IngreSerializer

    def get_queryset(self):
        ingres = Ingredient.objects.all()
        return ingres


class RefriIngreAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RefriIngreSerializer

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        user_refri_ingre = []
        user_refri = RefriIngre.objects.all().filter(user=self.get_object().id)
        for ig in user_refri:
            user_refri_ingre.append(
                Ingredient.objects.get(id=ig.ingre_name.id))
        return user_refri_ingre

    def post(self, request):
        RefriIngre.objects.all().filter(user=self.get_object().id).delete()
        for ppkk in request.data['my_ingre']:
            new_ingre = {
                'ingre_name': Ingredient.objects.get(id=ppkk).id
            }
            serializer = RefriIngreSerializer(data=new_ingre)
            if serializer.is_valid():
                serializer.save(user=self.request.user)
        return Response('success')


class HateIngreAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = HateIngreSerialzier

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        user_hate_ingre = []
        user_hate = HateIngre.objects.all().filter(user=self.get_object().id)
        for ig in user_hate:
            user_hate_ingre.append(Ingredient.objects.get(id=ig.ingre_name.id))
        return user_hate_ingre

    def post(self, request):
        HateIngre.objects.all().filter(user=self.get_object().id).delete()
        for ppkk in request.data['my_ingre']:
            new_ingre = {
                'ingre_name': Ingredient.objects.get(id=ppkk).id
            }
            serializer = HateIngreSerialzier(data=new_ingre)
            if serializer.is_valid():
                serializer.save(user=self.request.user)
        return Response('success')


class LikeIngreAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LikeIngreSerialzier

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        user_like_ingre = []
        user_like = LikeIngre.objects.all().filter(user=self.get_object().id)
        for ig in user_like:
            user_like_ingre.append(Ingredient.objects.get(id=ig.ingre_name.id))
        return user_like_ingre

    def post(self, request):
        LikeIngre.objects.all().filter(user=self.get_object().id).delete()
        for ppkk in request.data['my_ingre']:
            new_ingre = {
                'ingre_name': Ingredient.objects.get(id=ppkk).id
            }
            serializer = LikeIngreSerialzier(data=new_ingre)
            if serializer.is_valid():
                serializer.save(user=self.request.user)
        return Response('success')


class RecipeCommentAPI(generics.ListAPIView):
    serializer_class = RecipeCommentSerializer

    def get_object(self, recipe_pk):
        return Recipe.objects.get(pk=recipe_pk)

    def get(self, request, recipe_pk):
        recipe = self.get_object(recipe_pk)
        comments = RecipeComment.objects.filter(recipe=recipe)
        serializer = RecipeCommentSerializer(comments, many=True)
        print(serializer.data)
        forBaenom = []
        for reco in serializer.data:
            data = {
                'id': reco['id'],
                'comment_content': reco['comment_content'],
                'comment_create': reco['comment_create'],
                'comment_edit': reco['comment_edit'],
                'user': RealUser.objects.get(id=reco['user']).username,
                'recipe': reco['recipe'],
            }
            forBaenom.append(data)
        return Response(forBaenom)


class UserCommentAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RecipeCommentSerializer

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        user_comments = RecipeComment.objects.all().filter(user=self.get_object().id)
        return user_comments


class BaenomCommentAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RecipeCommentSerializer

    def get_object(self):
        return self.request.user

    def delete(self, request, recipe_pk, comment_pk):
        RecipeComment.objects.filter(
            id=comment_pk, user=self.get_object()).delete()
        return Response('fuck3')


class CommentAPI(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RecipeCommentSerializer

    def get_object(self):
        return self.request.user

    def post(self, request):
        data = request.data
        recipe = Recipe.objects.get(id=int(request.data['recipe']))
        comment = RecipeComment(
            user=self.get_object(),
            recipe=recipe,
            comment_content=request.data['comment_content'],
        )
        comment.save()
        return Response('fuck')

    def put(self, request):
        data = request.data
        comment = RecipeComment.objects.filter(
            id=request.data['comment_id'], user=self.get_object())
        comment.update(
            comment_content=request.data['comment_content'],
        )
        return Response('fuck2')

    # def delete(self, request):
    #     RecipeComment.objects.filter(id=request.data['comment_id'], user=self.get_object()).delete()
    #     return Response('fuck3')


class Recommend_RefriAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RecipeSerializer

    # 유저의 정보 불러오기
    def get_object(self):
        return self.request.user

    # 냉장고 재료 기반 추천
    def get_queryset(self):

        # 레시피 정보 불러오기
        recipes = Recipe.objects.all()

        # 유저의 냉장고 정보 불러오기
        user_refri_ingre = []
        user_refri = RefriIngre.objects.all().filter(user=self.get_object().id)
        for ig in user_refri:
            user_refri_ingre.append(
                Ingredient.objects.get(id=ig.ingre_name.id))

        # 유저의 기피재료 정보 불러오기
        user_hate_ingre = []
        user_hate = HateIngre.objects.all().filter(user=self.get_object().id)
        for ig in user_hate:
            user_hate_ingre.append(Ingredient.objects.get(id=ig.ingre_name.id))

        # 기피재료에 따른 레시피 선별
        sort_recipes = []
        count = 0
        for recipe in recipes:
            count = 0
            for hate in user_hate_ingre:
                recipe_ingredents = recipe.order_ingre.all()

                for recipe_ingredent in recipe_ingredents:
                    if hate.ingre_name in recipe_ingredent.order_ingre:
                        count += 1
                        break

            if count == 0:
                sort_recipes.append([recipe, 0])

        results = []

        # 냉장고재료에 따라 레시피 results에 추가
        for recipe in sort_recipes:
            for refri in user_refri_ingre:
                recipe_ingredents = recipe[0].order_ingre.all()

                for recipe_ingredent in recipe_ingredents:
                    if refri.ingre_name in recipe_ingredent.order_ingre:
                        recipe[1] += 1

                if refri.ingre_name in recipe[0].recipe_name:
                    recipe[1] += 1

            if recipe[1] > 0:
                results.append(recipe)

        # 선호재료 수에 따라 레시피 우선순위 변경
        results = sorted(results, key=lambda x: -x[1])

        recommend_refri = []

        for i in range(0, 12):
            try:
                recommend_refri.append(results[i][0])
            except:
                break

        return recommend_refri


class Recommend_LikeAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RecipeSerializer

    # 유저의 정보 불러오기
    def get_object(self):
        return self.request.user

    # 선호 재료 기반 추천
    def get_queryset(self):

        # 레시피 정보 불러오기
        recipes = Recipe.objects.all()

        # 유저의 선호재료 정보 불러오기
        user_like_ingre = []
        user_like = LikeIngre.objects.all().filter(user=self.get_object().id)
        for ig in user_like:
            user_like_ingre.append(Ingredient.objects.get(id=ig.ingre_name.id))

        # 유저의 기피재료 정보 불러오기
        user_hate_ingre = []
        user_hate = HateIngre.objects.all().filter(user=self.get_object().id)
        for ig in user_hate:
            user_hate_ingre.append(Ingredient.objects.get(id=ig.ingre_name.id))

        # 기피재료에 따른 레시피 선별
        sort_recipes = []
        count = 0
        for recipe in recipes:
            count = 0
            for hate in user_hate_ingre:
                recipe_ingredents = recipe.order_ingre.all()

                for recipe_ingredent in recipe_ingredents:
                    if hate.ingre_name in recipe_ingredent.order_ingre:
                        count += 1
                        break

            if count == 0:
                sort_recipes.append([recipe, 0])

        results = []

        # 선호재료에 따라 레시피 results에 추가
        for recipe in sort_recipes:
            for like in user_like_ingre:
                recipe_ingredents = recipe[0].order_ingre.all()

                for recipe_ingredent in recipe_ingredents:
                    if like.ingre_name in recipe_ingredent.order_ingre:
                        recipe[1] += 1

                if like.ingre_name in recipe[0].recipe_name:
                    recipe[1] += 1

            if recipe[1] > 0:
                results.append(recipe)

        # 선호재료 수에 따라 레시피 우선순위 변경
        results = sorted(results, key=lambda x: -x[1])

        recommend_like = []

        for i in range(0, 12):
            try:
                recommend_like.append(results[i][0])
            except:
                break

        return recommend_like


class Recommend_HitAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RecipeSerializer

    # 유저의 정보 불러오기
    def get_object(self):
        return self.request.user

    # 선호 재료 기반 추천
    def get_queryset(self):

        # 레시피 정보 불러오기
        recipes = Recipe.objects.all()

        # 유저의 기피재료 정보 불러오기
        user_hate_ingre = []
        user_hate = HateIngre.objects.all().filter(user=self.get_object().id)
        for ig in user_hate:
            user_hate_ingre.append(Ingredient.objects.get(id=ig.ingre_name.id))

        # 기피재료에 따른 레시피 선별
        results = []

        count = 0
        for recipe in recipes:
            count = 0
            for hate in user_hate_ingre:
                recipe_ingredents = recipe.order_ingre.all()

                for recipe_ingredent in recipe_ingredents:
                    if hate.ingre_name in recipe_ingredent.order_ingre:
                        count += 1
                        break

            if count == 0:
                results.append(recipe)

        # 선호재료 수에 따라 레시피 우선순위 변경
        results = sorted(results, key=lambda x: -x.recipe_hits)

        recommend_hit = []

        for i in range(0, 12):
            try:
                recommend_hit.append(results[i])
            except:
                break

        return recommend_hit


class Recommend_RankAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RecipeSerializer

    # 유저의 정보 불러오기
    def get_object(self):
        return self.request.user

    # 선호 재료 기반 추천
    def get_queryset(self):
        Ranks = Rank.objects.all()

        # 로그인 하고
        my_id = self.get_object().id

        # 내가 평가한 레시피들을 불러옴

        my_recps = Rank.objects.filter(user_id=my_id)
        my_rank = []
        for i in my_recps:
            c = i.recipe_id
            my_rank.append(c)

        # 그 레시피들을 for 문으로 하나씩 불러와서

        my_score_board = {}
        for i in my_rank:
            rec = Rank.objects.filter(user_id=my_id, recipe_id=i)

            x1 = [[1], [1], [1], [1]]
            w = np.array(x1)

            # 내가 매긴 점수 확인
            a, b, c, d = rec[0].rank_difficulty, rec[0].rank_flavor, rec[0].rank_clean, rec[0].rank_reuse
            x2 = [a, b, c, d]

            # 내 점수 행렬로 변환
            my_score = np.array(x2)

            # 다른사람의 점수 분석
            for j in Ranks:
                if j.recipe_id == i:
                    human = j.user_id
                    a1, b1, c1, d1 = j.rank_difficulty, j.rank_flavor, j.rank_clean, j.rank_reuse
                    x3 = [a1, b1, c1, d1]
                    other_score = np.array(x3)

                    # 다른사람 점수 - 내 점수
                    sub_score = np.abs(other_score - my_score)

                    # cal_score = np.subtract(other_score, my_score) 와 같음

                    # 가중치를 곱해서 점수를 만듬
                    tot_score = np.dot(sub_score, w)
                    x3 = [tot_score[0], 1]
                    ans = np.array(x3)

                    #   유저id를 key, [점수, 횟수]를 value로 저장하기. 점수별로 [점수, 1] 을 더해간다 np로?
                    #   np로 가능해서 점수더해짐
                    if human in my_score_board.keys():
                        x4 = my_score_board[human] + ans
                        my_score_board[human] = x4
                    else:
                        my_score_board[human] = ans

                #   이렇게 유저별로 평점에 대한 데이터 축적

                #   끝나면 최종 취합 함수 실행

            # 최종 취합 함수
        avg_dict = {}
        # 각 value에서 0번째를 1번째로 나누어 key, key값을 value로 하는 리스트로 저장
        for key, value in my_score_board.items():

            point = value[0] / value[1]
            avg_dict[point] = key

        # key를 기준으로 오름차순으로 정렬하여 각 유저별로 평점모음 DB구축
        avg_dict = sorted(avg_dict.items())

        # 추천 함수
        # 평가된 사람이 3명이하 일 때
        if 1 <= len(avg_dict) < 4:
            top = len(avg_dict)
        else:
            top = 4

        # 내 평점모음 함수 중 상위 3명정도? 유저 id 가져옴
        recommend_rec_temp = []
        # 해당 유저 아이디가 평가한 레시피 가져오고
        for i in range(1, top):
            man = avg_dict[i][1]
            x5 = Rank.objects.filter(user_id=man)
            for x6 in x5:
                x7 = x6.recipe_id
                recommend_rec_temp.append(x7)
        recommend_rec_temp = set(recommend_rec_temp)
        recommend_recipe = []
        # 평점모음에 레시피 아이디와 내 아이디가 있다면 패스, 아니면 append
        # 반복해서 돌려서 저장 후 출력
        for i in recommend_rec_temp:
            if i in my_rank:
                pass
            else:
                sample = Recipe.objects.all().filter(pk=i)[0]
                recommend_recipe.append(
                    sample)
        final = []
        if len(recommend_recipe) > 13:
            final = random.sample(recommend_recipe, 12)
        else:
            final = recommend_recipe

        return final
