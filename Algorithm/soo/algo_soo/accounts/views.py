from django.shortcuts import render
from .models import Recipe, RealUser


# Create your views here.


def index(request):
    # 레시피 정보 불러오기
    recipes = Recipe.objects.all()

    # 유저의 정보를 불러오기
    realusers  = RealUser.objects.all()

    # 2번(인덱스로1번 유저)유저의 선호재료, 기피재료 가져옴
    likes = realusers[1].user_likeIngre.all()
    hates = realusers[1].user_hateIngre.all()

    # 기피재료에 따라 레시피 제거
    sort_recipes = []
    for recipe in recipes:
        for hate in hates:
            recipe_ingredents = recipe.order_ingre.all()
            count = len(recipe_ingredents)
 
            for recipe_ingredent in recipe_ingredents:
                if hate.ingre_name not in recipe_ingredent.order_ingre:
                    count -=1
                else :
                    break

        if count == 0:
            sort_recipes.append([recipe,0])

    results = []

    # 선호재료에 따라 레시피 results에 추가
    for recipe in sort_recipes:
        for like in likes:
            recipe_ingredents = recipe[0].order_ingre.all()

            for recipe_ingredent in recipe_ingredents:
                if like.ingre_name in recipe_ingredent.order_ingre:
                    recipe[1] += 1

        if like.ingre_name in recipe[0].recipe_name:
            recipe[1] += 1
                    
        if recipe[1] > 0:
            results.append(recipe)

    # 선호재료 수에 따라 레시피 우선순위 변경
    results = sorted(results, key = lambda x : -x[1])

    context = {
        'results' : results,
    }
    return render(request, 'accounts/index.html', context)


def recommand2(request):

   # 레시피 정보 불러오기
    recipes = Recipe.objects.all()

    # 유저의 정보를 불러오기
    realusers  = RealUser.objects.all()

    # 2번(인덱스로1번 유저)유저의 선호재료, 기피재료 가져옴
    refris = realusers[1].user_refri.all()
    hates = realusers[1].user_hateIngre.all()

    # 기피재료에 따라 레시피 제거
    sort_recipes = []
    for recipe in recipes:
        for hate in hates:
            recipe_ingredents = recipe.order_ingre.all()
            count = len(recipe_ingredents)
 
            for recipe_ingredent in recipe_ingredents:
                if hate.ingre_name not in recipe_ingredent.order_ingre:
                    count -=1
                else :
                    break

        if count == 0:
            sort_recipes.append([recipe,0])

    results = []

    # 냉장고재료에 따라 레시피 results에 추가
    for recipe in sort_recipes:
        for refri in refris:
            recipe_ingredents = recipe[0].order_ingre.all()

            for recipe_ingredent in recipe_ingredents:
                if refri.ingre_name in recipe_ingredent.order_ingre:
                    recipe[1] += 1

        if refri.ingre_name in recipe[0].recipe_name:
            recipe[1] += 1
                    
        if recipe[1] > 0:
            results.append(recipe)

    print("아니")
    # 선호재료 수에 따라 레시피 우선순위 변경
    results = sorted(results, key = lambda x : -x[1])
    print(results)
    context = {
        'results' : results,
    }


    return render(request, 'accounts/recommand2.html', context)


def recommand3(request):

    # 레시피 정보 불러오기
    recipes = Recipe.objects.all()

    # 유저의 정보를 불러오기
    realusers  = RealUser.objects.all()

    # 2번(인덱스로1번 유저)유저의 냉장고재료, 기피재료 가져옴
    hates = realusers[1].user_hateIngre.all()

    # 기피재료에 따라 레시피 제거
    results = []

    for recipe in recipes:
        for hate in hates:
            if hate.ingre_name not in recipe.order_ingre.all():
                results.append(recipe)
    
    # 레시피 중복제거
    results = list(set(results))
    
                

    # 조회수에 따라 sort 진행
    results = sorted(results, key = lambda x : -x.recipe_hits)
    print(results)

    context = {
        'results' : results,
    }


    return render(request, 'accounts/recommand3.html', context)