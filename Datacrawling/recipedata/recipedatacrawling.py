import urllib.request
from bs4 import BeautifulSoup

from urllib.request import HTTPError
from urllib.request import URLError
from urllib.request import urlopen

import requests
import json
from collections import OrderedDict

file_path = "./100recipedata.json"


def PageCrawler(pk, recipeUrl):

    global cnt
    url = 'http://www.10000recipe.com/recipe/' + recipeUrl
    req = urllib.request.Request(url)
    sourcecode = urllib.request.urlopen(url).read()
    soup = BeautifulSoup(sourcecode, "lxml")
    recipe_image = []
    recipe_name = []
    # recipe_source = []
    recipe_step = []
    recipe_introduce = []

    res = soup.find('div', 'view2_summary')
    if res is None:
        cnt += 1
        return
    res = res.find('h3')
    recipe_name.append(res.get_text())

    res_thum = soup.find('div', 'view2_pic')
    res_thum = res_thum.find("div", 'centeredcrop')
    res_thumnail = res_thum.find("img")
    res_thumnailpic = res_thumnail.get("src")
    recipe_image.append(res_thumnailpic)

    # res_sum_in = soup.find('div', 'view2_summary_in')
    # recipe_summary_in.append(res_sum_in.get_text().replace('\n', ''))

    res_sum_info = soup.find('div', 'view2_summary_info')
    recipe_introduce.append(res_sum_info.get_text().replace('\n', ''))

    # res = soup.find('div', 'ready_ingre3')
    # # 재료 찾는 for문 가금 형식에 맞지 않는 레시피들이 있어 try/except 해준다.
    # try:
    #     for n in res.find_all('ul'):
    #         source = []
    #         title = n.find('b').get_text()
    #         source_title = title[1:-1]
    #         if source_title == "필수재료" or "주재료":
    #             source_title = "재료"
    #         recipe_source[source_title] = ''
    #         for tmp in n.find_all('li'):
    #             data = tmp.get_text().replace('\n', '').split('  ')[0]
    #             source.append(data)
    #         recipe_source[source_title] = source
    # except(AttributeError):
    #     print("{} : {}".format(recipeUrl, "source error"))
    #     cnt += 1
    #     return

    # 요리 순서 찾는 for 문
    res = soup.find('div', 'view_step')
    i = 0
    try:
        for n in res.find_all('div', 'view_step_cont'):
            # print(n)
            i = i + 1
            try:
                img_title = str(i)
                recipe_step_pic[img_title] = ''
                img = n.find('img')
                img_src = img.get('src')  # 조리법 단계별 사진
                recipe_step_pic[img_title] = img_src
            except:

                img_src = []
                pass
            recipe_step.append('#' + str(i) + ' ' +
                               n.get_text().replace('\n', ' '))
            # 나중에 순서를 구분해주기 위해 숫자와 #을 넣는다.
    except(AttributeError):
        print("{} : {}".format(recipeUrl, "step error"))
        cnt += 1
        return

    # 블로그 형식의 글은 스텝이 정확하게 되어있지 않기 때문에 제외해준다
    if not recipe_step:
        return
    # print("{} {}".format(recipeUrl, "ok"))
    recipe_all = {"model": "accounts.Recipe", "pk": pk, "fields": {
        "recipe_name": recipe_name, "recipe_image": recipe_image, "recipe_intro": recipe_introduce, "order_id": int(recipeUrl)}}

    return(recipe_all)


recipe = OrderedDict()
recipe = []
cnt = 0

pk = 0
for i in range(6941748, 6941848):
    # flag = 0
    recipe_id = str(i)
    result = PageCrawler(pk, recipe_id)
    if result is not None:
        recipe.append(result)
        pk += 1

# toJson(recipe)
with open(file_path, 'w', encoding="utf-8") as file:
    json.dump(recipe, file, ensure_ascii=False, indent="\t")
print(cnt)
print("finish")

# print(json.dumps(recipe, ensure_ascii=False, indent="\t"))

# 빈값때문에 안되는 레시피 번호들
# 131871, 131880

# 시작번호 131871, 끝번호 6941848

# recipe = OrderedDict()
# a = str(131872)
# recipe[a] = PageCrawler(a)
# print(json.dumps(recipe, ensure_ascii=False, indent="\t"))
