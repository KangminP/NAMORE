from django.shortcuts import render
from .models import *
import numpy as np
from collections import Counter

import random


# Create your views here.


def home(request):

    Recipes = Recipe.objects.all()

    context = {
        'Recipes': Recipes,
    }
    return render(request, 'algo/home.html', context)


def choice(request):
    # 레시피 정보 불러오기
    my_id = 3
    recipes = Recipe.objects.all()

    # 유저의 선호재료 정보 불러오기
    user_like_ingre = []
    user_like = LikeIngre.objects.all().filter(user=my_id)
    for ig in user_like:
        user_like_ingre.append(Ingredient.objects.get(id=ig.ingre_name.id))

    # 유저의 기피재료 정보 불러오기
    user_hate_ingre = []
    user_hate = HateIngre.objects.all().filter(user=my_id)
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
    print(recommend_like)
    # 호출명 저장
    context = {
        'Recipes': recipes,
        'Fifs': fifs,
        'Orderingres': Orderingres,
        'OrderImgContents': OrderImgContents,
        'Fivs': fivs,
        'Tens': tens,
        'Fifs': fifs,
        'Twens': twens,
        'Thirs': thirs,
        'Sixs': sixs,
        'Nins': nins,
        'Hunds': hunds

    }
    return render(request, 'algo/choice.html', context)

################ 협업 알고리즘 ################


def recommend(request):
    Recipes = Recipe.objects.all()
    Realusers = RealUser.objects.all()
    Ranks = Rank.objects.all()

    # 로그인 하고
    # 내가 평가한 레시피들을 불러옴
    my_id = 3

    # print(len(Ranks))
    my_recps = Rank.objects.filter(user_id=my_id)
    my_rank = []
    # print(my_recps)
    for i in my_recps:
        c = i.recipe_id
        # print(c)
        my_rank.append(c)
    # print(my_rank)

    # 그 레시피들을 for 문으로 하나씩 불러와서

    my_score_board = {}
    for i in my_rank:
        '''
        print()
        print("레시피 입장")
        '''
        rec = Rank.objects.filter(user_id=my_id, recipe_id=i)
        # 나의 가중치 확인
        x1 = [[4], [3], [2], [1]]
        w = np.array(x1)

        # 내가 매긴 점수 확인
        # a = rec[0].rank_difficulty
        a, b, c, d = rec[0].rank_difficulty, rec[0].rank_flavor, rec[0].rank_clean, rec[0].rank_reuse
        x2 = [a, b, c, d]

        # 내 점수 행렬로 변환
        my_score = np.array(x2)
        # print(a)
        # print(rec[0])
        # print(w)
        # print(my_score)

        # 다른사람의 점수 분석
        # 나와 다른지 조건검색을 할지 or 어차피 0이니 무시해도 됨 (연산 빠른 쪽으로)
        for j in Ranks:
            if j.recipe_id == i:
                '''
                print("-----------------")
                print('{} 다른사람: {} 레시피 : {}'.format(i, j.user_id, j.recipe_id))
                print(j)
                '''
                human = j.user_id
                a1, b1, c1, d1 = j.rank_difficulty, j.rank_flavor, j.rank_clean, j.rank_reuse
                x3 = [a1, b1, c1, d1]
                other_score = np.array(x3)

                # 다른사람 점수 - 내 점수
                sub_score = np.abs(other_score - my_score)
                # cal_score = np.subtract(other_score, my_score) 와 같음
                # print(cal_score)

                # 가중치를 곱해서 점수를 만듬
                tot_score = np.dot(sub_score, w)
                '''
                print("곱 확인")
                print(tot_score)
                '''
                # print(tot_score[0])
                x3 = [tot_score[0], 1]
                ans = np.array(x3)
                '''
                print('배열확인')
                print(ans)
                print('human 확인')
                print(human)
                '''
    #   유저id를 key, [점수, 횟수]를 value로 저장하기. 점수별로 [점수, 1] 을 더해간다 np로?
    #   np로 가능해서 점수더해짐
                if human in my_score_board.keys():
                    '''
                    print('값 확인')
                    print(my_score_board[human])
                    print(x4)
                    '''
                    x4 = my_score_board[human] + ans
                    my_score_board[human] = x4
                    # print('다른사람 : {} {} {}'.format(human, j, my_score_board))
                else:
                    my_score_board[human] = ans
                    '''
                    print('else!!!!!!')
                    print('다른사람 :{} {} {}'.format(human, j, my_score_board))
                    '''

    #   이렇게 유저별로 평점에 대한 데이터 축적
    print(my_score_board)

    #   끝나면 최종 취합 함수 실행

    # 최종 취합 함수
    avg_dict = {}
    # 각 value에서 0번째를 1번째로 나누어 key, key값을 value로 하는 리스트로 저장
    for key, value in my_score_board.items():
        print(key, value[0])
        point = value[0] / value[1]
        avg_dict[point] = key
    print(avg_dict)
    # key를 기준으로 오름차순으로 정렬하여 각 유저별로 평점모음 DB구축
    avg_dict = sorted(avg_dict.items())
    print('정렬 후')
    print(avg_dict)

    # realfinal(my_score_board)

    # 추천 함수
    # 내 평점모음 함수 중 상위 3명정도? 유저 id 가져옴
    recommend_rec_temp = []
    # 해당 유저 아이디가 평가한 레시피 가져오고
    for i in range(1, 4):
        man = avg_dict[i][1]
        x5 = Rank.objects.filter(user_id=man)
        for x6 in x5:
            x7 = x6.recipe_id
            recommend_rec_temp.append(x7)
    print()
    print('추천 후보들')
    recommend_rec_temp = set(recommend_rec_temp)
    print(recommend_rec_temp)
    recommend_recipe = []
    # 평점모음에 레시피 아이디와 내 아이디가 있다면 패스, 아니면 append
    # 반복해서 돌려서 저장 후 출력
    for i in recommend_rec_temp:
        if i in my_rank:
            pass
        else:
            sample = Recipe.objects.all().filter(pk=i)[0]
            print(sample)
            print(type(sample))
            recommend_recipe.append(sample)
            print()

    print()
    print('최종')
    print(len(recommend_recipe))
    print(type(recommend_recipe))
    print(recommend_recipe)
    recorecipe = []
    if len(recommend_recipe) > 13:
        recorecipe = random.sample(recommend_recipe, 12)
    else:
        recorecipe = recommend_recipe
    print(len(recorecipe))
    print(recorecipe)

    context = {
        'Rank': Ranks
    }

    return render(request, 'algo/recommend.html', context)
