import random
import requests
import json

rankdatafile = "./rankdata.json"

rankdata = []
pk = 0
while pk < 100:
    user = random.randrange(1, 10)
    recipe = random.randrange(1, 50)
    rank_difficulty = random.randrange(1, 6)
    rank_flavor = random.randrange(1, 6)
    rank_clean = random.randrange(1, 6)
    rank_reuse = random.randrange(1, 6)

    rank = {
        "model": "algo.Rank",
        "pk": pk,
        "fields": {
            "user": user,
            "recipe": recipe,
            "rank_difficulty": rank_difficulty,
            "rank_flavor": rank_flavor,
            "rank_clean": rank_clean,
            "rank_reuse": rank_reuse,
        }
    }
    pk += 1
    rankdata.append(rank)

with open(rankdatafile, 'w', encoding="utf-8") as file:
    json.dump(rankdata, file, ensure_ascii=False, indent="\t")
print("finish")
