import json

import requests

challenge_to_xp = {
    0: 0,
    .125: 25,
    .25: 50,
    .5: 100,
    1: 200,
    2: 450,
    3: 700,
    4: 1100,
    5: 1800,
    6: 2300,
    7: 2900,
    8: 3900,
    9: 5000,
    10: 5900,
    11: 7200,
    12: 8400,
    13: 10000,
    14: 11500,
    15: 13000,
    16: 15000,
    17: 18000,
    18: 20000,
    19: 22000,
    20: 25000,
    21: 33000,
    22: 41000,
    23: 50000,
    24: 62000,
    25: 75000,
    26: 90000,
    27: 105000,
    28: 120000,
    29: 135000,
    30: 155000,
}

# with open("api_monsters.yaml", "w") as file:
    # Collect 2014 monsters from 5e API
    # url = "https://www.dnd5eapi.co/api/monsters"
    #
    # payload = {}
    # headers = {
    #     'Accept': 'application/json'
    # }
    #
    # response = requests.request("GET", url, headers=headers, data=payload)
    # for monster in response.json()["results"]:
    #     response2 = requests.request("GET", url + f"/{monster["index"]}", headers=headers)
    #     result = response2.json()
    #     for prof in result.get("proficiencies", []):
    #         if prof.get("proficiency", {}).get("index") == "skill-stealth":
    #             stealth = prof["value"]
    #             break
    #     else:
    #         stealth = 0
    #
    #     armor_class = 0
    #     for ac in result.get("armor_class", []):
    #         if ac.get("value"):
    #             armor_class = ac.get("value")
    #             break
    #
    #     file.writelines([
    #         f"- {result['index']}:\n",
    #         f"    source: 5eAPI",
    #         f"    name: {result['name']}\n",
    #         f"    type: {result['type']}\n",
    #         f"    xp: {result['xp']}\n",
    #         f"    api_url: {result['url']}\n",
    #         f"    alignment: {result['alignment']}\n"
    #         f"    str: {result['strength']}\n",
    #         f"    dex: {result['dexterity']}\n",
    #         f"    con: {result['constitution']}\n",
    #         f"    int: {result['intelligence']}\n",
    #         f"    wis: {result['wisdom']}\n",
    #         f"    cha: {result['charisma']}\n",
    #         f"    stealth: {stealth}\n",
    #         f"    ac: {armor_class}\n",
    #         f"    hp: {result['hit_points']}\n",
    #     ])
with open("sf_monsters.yaml", "w") as file:
    # Get everything from sly flourish's DB
    with open("../5e_monsters/monsters.json", "r") as monsters_json:
        monsters = json.load(monsters_json)
        for result in monsters:
            challenge_rating = int(result.get("challenge_rating", 0))

            file.writelines([
                f"- {result['slug']}:\n",
                f"    source: {result['document__title']}\n",
                f"    name: {result['name']}\n",
                f"    type: {result['type']}\n",
                f"    xp: {challenge_to_xp[challenge_rating]}\n",
                f"    api_url: sf\n",
                f"    alignment: {result.get('alignment')}\n"
                f"    str: {result.get('strength')}\n",
                f"    dex: {result.get('dexterity')}\n",
                f"    con: {result.get('constitution')}\n",
                f"    int: {result.get('intelligence')}\n",
                f"    wis: {result.get('wisdom')}\n",
                f"    cha: {result.get('charisma')}\n",
                # f"    stealth: {stealth}\n",
                f"    ac: {result.get('armor_class')}\n",
                f"    hp: {result.get('hit_points')}\n",
            ])

