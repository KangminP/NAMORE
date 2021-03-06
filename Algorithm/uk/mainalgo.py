# 로그인 하고
# 내가 평가한 레시피들을 불러옴
# 그 레시피들을 for 문으로 하나씩 불러와서
#   for 문으로 그 레시피의 rank DB를  받아옴
#   유저id, 레시피id, 각 점수를 하나의 row 행으로 하여 2차원 배열로 뽑아냄
#   모든 점수에 내 점수를 빼고 절대값
#   numpy로 행렬 곱으로 결과값 도출
#   유저id를 key, [점수, 횟수]를 value로 저장하기. 점수별로 [점수, 1] 을 더해간다 np로?
#   이렇게 유저별로 평점에 대한 데이터 축적
#   끝나면 최종 취합 함수 실행

# 최종 취합 함수
# 각 value에서 0번째를 1번째로 나누어 key, key값을 value로 하는 리스트로 저장
# key를 기준으로 오름차순으로 정렬하여 각 유저별로 평점모음 DB구축

# 추천 함수
# 내 평점모음 함수 중 상위 3명정도? 유저 id 가져옴
# 해당 유저 아이디가 평가한 레시피 가져오고
# 평점모음에 레시피 아이디와 내 아이디가 있다면 패스, 아니면 append
# 반복해서 돌려서 저장 후 출력
