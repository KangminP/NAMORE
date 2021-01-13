
### 비슷한 선호 유저 선정 ###
# 1. 로그인 User의 모든 평가 레시피를 받아와야함
# 2. 해당 레시피에 대해서 User의 평과 타 User의 평을 절대값의 차로 계산하여 가중치를 곱한다
# 3. 100 - 해당값을 토대로 점수를 산정한다.
# 4. User의 모든 레시피에 대해서 타 User의 점수를 산정
# 5. 최종 값들에 대해서 평균값을 매겨 높은 순으로 타 User 리스트 선정


# 1.
# 가중치
auth_user_like = [4,3,2,1]
# 레피시 번호, 점수
auth_user_recipe = [[1,[5,5,2,1]],[2,[2,2,5,3]]]

# 2.
# 첫번째 인덱스 레시피 번호
# 두번째 인덱스 유저 번호
# 세번째 인덱스 해당 레피시에 대한 유저 평가
select_recipes = [
    [1,
        [
            [2,[5,5,1,1]],[3,[1,1,2,2]],[5,[4,4,4,4]]
        ]
    ],
    [2,
        [
            [2,[2,2,5,3]],[3,[1,1,3,2]],[4,[2,2,5,3]]
        ]
    ]
]


# 3, 4
for recipe_num in range(0,len(auth_user_recipe)):
    recipe_nums = auth_user_recipe[recipe_num][0]
    for select_num in range(0,len(select_recipes)) :
        if recipe_nums == select_recipes[select_num][0]:
            for select_num_user in range(0,len(select_recipes[select_num][1])):
                select_num_users = select_recipes[select_num][1][select_num_user][1]

                Sum = 0
                for i in range(0,4):
                    Sum += abs(select_num_users[i] - auth_user_recipe[recipe_num][1][i]) * auth_user_like[i]
                
                select_recipes[select_num][1][select_num_user][1] = 100 - Sum


result = []
for i in range(0,10):
    result.append([0,0])


for i in range(0,len(select_recipes)):
    for j in range(0, len(select_recipes[i][1])):
        result[select_recipes[i][1][j][0]][0] += 1
        result[select_recipes[i][1][j][0]][1] += select_recipes[i][1][j][1]

for i in range(0,len(result)):
    if result[i][0] != 0:
        result[i][1] = result[i][1] / result[i][0]
    
print(result)
### 선호 유저에 대한 레시피 추천 ###
# 1. 로그인 한 User의 선호도 등급을 기반으로 타 User가 평가한 모든 레시피에 점수 산정
# 2. 해당 레시피에 대해 평가된 점수에 대해 평균 산정
# 3. 일정한 점수 간격으로 (간격 0.5점, 시작 5.0, 최저 3.5점) 구분하여 선정
# 4. 기피재료가 있는 경우 해당 레시피 제외
# 5. 인원 겹치는 부분에 대해서는 아직 마땅한 방안 안떠오름

all_user = [
    [2,[1,[5,5,5,5]],[2,[2,2,2,5]],[3,[3,3,5,1]],[4,[5,2,3,4]]],
    [3,[1,[1,1,2,2]],[2,[1,1,3,2]],[3,[5,5,1,1]],[6,[2,2,3,5]]],
    [4,[2,[2,2,5,3]],[6,[5,5,1,1]],[7,[4,5,3,2]]],
    [5,[1,[4,4,4,4]],[5,[5,5,2,4]]],
    ]

# print(all_user)

recommend_user = []
for i in range(len(result)):
    if result[i][1] > 80:
        recommend_user.append([i,result[i][1]])

print(recommend_user)

recommend_user_recipe = []
test1 = []

for i in range(len(recommend_user)):
    for j in range(len(all_user)):
        if recommend_user[i][0] == all_user[j][0]:
            for k in range(1,len(all_user[j])):
                if (all_user[j][k][1][0] * auth_user_like[0] + all_user[j][k][1][1] * auth_user_like[1] + all_user[j][k][1][2] * auth_user_like[2] + all_user[j][k][1][3] * auth_user_like[3]) / 10 >= 3.5:
                    score = (all_user[j][k][1][0] * auth_user_like[0] + all_user[j][k][1][1] * auth_user_like[1] + all_user[j][k][1][2] * auth_user_like[2] + all_user[j][k][1][3] * auth_user_like[3]) / 10
                    recommend_user_recipe.append([all_user[j][k][0],score])

print(recommend_user_recipe)

for i in range(len(auth_user_recipe)):
    for j in range(len(recommend_user_recipe)):
        if auth_user_recipe[i][0] == recommend_user_recipe[j][0]:
            recommend_user_recipe[j] = [0,0]

while [0,0] in recommend_user_recipe:
    recommend_user_recipe.remove([0,0])

recommend_user_recipe = sorted(recommend_user_recipe, key = lambda x : -x[1])

print(recommend_user_recipe)
