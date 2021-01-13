import urllib.request
from bs4 import BeautifulSoup

from urllib.request import HTTPError
from urllib.request import URLError
from urllib.request import urlopen

import requests
import json
from collections import OrderedDict

# orderfile = "./orderdata.json"
recipefile = "./recipedata.json"
orderImgContentfile = "./orderImgContent.json"
orderIngrefile = "./orderIngre.json"
ingrefile = "./ingredent.json"


def PageCrawler(pk, recipeUrl):
    global cnt, orderImgContentCnt, orderIngreCnt, jb_cnt
    url = 'http://www.10000recipe.com/recipe/' + recipeUrl
    # req = urllib.request.Request(url)
    sourcecode = urllib.request.urlopen(url).read()
    soup = BeautifulSoup(sourcecode, "lxml")
    order_content = []
    order_image = []
    # order_ingre = []

    orderImgContentPks = []
    orderIngrePks = []

    recipe_image = ''
    recipe_name = ''
    # recipe_introduce = ''
    # recipe_source = []
    # recipe_step = []

    # recipe 조회수
    hits_nums = soup.find('div', 'view_cate_num')
    if hits_nums == None:
        return
    recipe_hits = int(hits_nums.get_text().replace(',', ''))

    # recipe sheep, time,
    res_sum_info = soup.find('div', 'view2_summary_info')
    # recipe_introduce.append(res_sum_info.get_text().replace('\n', ''))
    # print(res_sum_info.get_text().split())
    recipe_intro = res_sum_info.get_text().split()
    # print("{} {}".format(recipeUrl, recipe_introduce))
    if len(recipe_intro) != 0:
        if recipe_intro[1] == "이상":
            recipe_intro.pop(1)

    # recipe 이름
    res = soup.find('div', 'view2_summary')
    if res is None:
        cnt += 1
        return
    res = res.find('h3')
    recipe_name += res.get_text()

    # recipe 이미지
    res_thum = soup.find('div', 'view2_pic')
    res_thum = res_thum.find("div", 'centeredcrop')
    res_thumnail = res_thum.find("img")
    res_thumnailpic = res_thumnail.get("src")
    recipe_image += res_thumnailpic

    # recipe 소개
    # res_sum_info = soup.find('div', 'view2_summary_info')
    # recipe_introduce += res_sum_info.get_text().replace('\n', '')

    #     return
    # 재료 찾는 for문 가끔 형식에 맞지 않는 레시피들이 있어 try/except 해준다.
    res = soup.find('div', 'ready_ingre3')
    try:
        for n in res.find_all('ul'):
            # title = n.find('li').get_text()
            # source_title = title[1:-1]
            # if source_title == "필수재료" or "주재료":
            #     source_title = "재료"
            # recipe_source[source_title] = ''
            for tmp in n.find_all('li'):
                data = tmp.get_text().replace('\n', '').split('  ')[0]
                if data in ingre_justname:
                    orderIngrePks.append(ingre_justname.index(data))
                    jb_cnt += 1
                else:
                    orderIngredata = {
                        "model": "accounts.OrderIngre",
                        "pk": orderIngreCnt,
                        "fields": {
                            "order_ingre": data
                        }
                    }
                    Ingredata = {
                        "model": "accounts.Ingredient",
                        'pk': orderIngreCnt,
                        "fields": {
                            "ingre_name": data
                        }
                    }
                    ingre_justname.append(data)
                    ingre.append(Ingredata)
                    orderIngre.append(orderIngredata)
                    orderIngrePks.append(orderIngreCnt)
                    orderIngreCnt += 1
                    

    except(AttributeError):
        print("{} : {}".format(recipeUrl, "source error"))
        cnt += 1
        return

    # 요리 순서 찾는 for 문
    res = soup.find('div', 'view_step')
    i = 0
    try:
        for n in res.find_all('div', 'view_step_cont'):
            # print(n)
            i = i + 1
            try:
                img = n.find('img')
                img_src = img.get('src')  # 조리법 단계별 사진
            except:
                img_src = ''
                pass

            order_image = img_src
            order_content = n.get_text().replace('\n', ' ')

            orderImgContentdata = {
                "model": "accounts.OrderImgContent",
                "pk": orderImgContentCnt,
                "fields": {
                    "order_image": order_image,
                    "order_content": order_content,
                }
            }
            orderImgContent.append(orderImgContentdata)
            orderImgContentPks.append(orderImgContentCnt)
            orderImgContentCnt += 1

            # 나중에 순서를 구분해주기 위해 숫자와 #을 넣는다.
    except(AttributeError):
        print("{} : {}".format(recipeUrl, "step error"))
        cnt += 1
        return

    # 블로그 형식의 글은 스텝이 정확하게 되어있지 않기 때문에 제외해준다
    if not order_content:
        return
    # print("{} {}".format(recipeUrl, "ok"))

    # orderdata = {
    #     "model": "accounts.Order",
    #     "pk": int(recipeUrl),
    #     "fields": {
    #         "order_image": order_image,
    #         "order_content": order_content,
    #         "order_ingre": order_ingre
    #     }
    # }

    recipedata = {
        "model": "accounts.Recipe",
        "pk": pk,
        "fields": {
            "recipe_name": recipe_name,
            "recipe_image": recipe_image,
            "recipe_hits": recipe_hits,
            # "recipe_intro": recipe_introduce,
            "recipe_sheep": int(recipe_intro[0][0]),
            "recipe_time": int(recipe_intro[1][:len(recipe_intro[1])-1]) if recipe_intro[1][-1] == '분' else int(recipe_intro[1][0]) * 60,
            "recipe_difficulty": recipe_intro[3],
            "order_img_content": orderImgContentPks,
            "order_ingre": orderIngrePks,
        }
    }

    # orderImgContentdata = {
    #     "model": "accounts.OrderImgContent",
    #     "pk": int(recipeUrl),
    #     "fields": {
    #         "order_image": order_image,
    #         "order_content": order_content,
    #     }
    # }

    # orderIngredata = {
    #     "model": "accounts.OrderIngre",
    #     "pk": int(recipeUrl),
    #     "fields": {
    #         "order_ingre": order_ingre
    #     }
    # }

    # return([orderdata, recipedata, orderImgContentdata, orderIngredata])
    return recipedata
ingre_justname = []
ingre = []
recipe = []
# order = []
orderImgContent = []
orderIngre = []
cnt = 0
jb_cnt = 0
pk = 0
orderImgContentCnt = 0
orderIngreCnt = 0
# next_num = 6941848
for i in range(6941748, 6941848):
    # flag = 0
    recipe_id = str(i)
    recipedata = PageCrawler(pk, recipe_id)
    # print("{} {}".format(i, type(PageCrawler(pk, recipe_id))))
    if recipedata is not None:
        # orderdata = PageCrawler(pk, recipe_id)[0]
        # orderImgContentdata = PageCrawler(pk, recipe_id)[1]
        # orderIngredata = PageCrawler(pk, recipe_id)[2]
        # order.append(orderdata)
        recipe.append(recipedata)
        pk += 1

# toJson(recipe)
# with open(orderfile, 'w', encoding="utf-8") as file:
#     json.dump(order, file, ensure_ascii=False, indent="\t")

with open(recipefile, 'w', encoding="utf-8") as file:
    json.dump(recipe, file, ensure_ascii=False, indent="\t")

with open(orderImgContentfile, 'w', encoding="utf-8") as file:
    json.dump(orderImgContent, file, ensure_ascii=False, indent="\t")

with open(orderIngrefile, 'w', encoding="utf-8") as file:
    json.dump(orderIngre, file, ensure_ascii=False, indent="\t")

with open(ingrefile, 'w', encoding="utf-8") as file:
    json.dump(ingre, file, ensure_ascii=False, indent="\t")

print(jb_cnt)
print(pk)
print("finish")

# 빈값때문에 안되는 레시피 번호들
# 131871, 131880

# 시작번호 131871, 끝번호 6941848

# print(json.dumps(recipe, ensure_ascii=False, indent="\t"))
