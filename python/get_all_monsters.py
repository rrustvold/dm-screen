import requests

url = "https://www.dnd5eapi.co/api/monsters"

payload = {}
headers = {
  'Accept': 'application/json'
}

response = requests.request("GET", url, headers=headers, data=payload)

with open("api_monsters.yaml", "w") as file:
    for monster in response.json()["results"]:
        response2 = requests.request("GET", url + f"/{monster["index"]}", headers=headers)
        result = response2.json()
        for prof in result.get("proficiencies", []):
            if prof.get("proficiency", {}).get("index") == "skill-stealth":
                stealth = prof["value"]
                break
        else:
            stealth = 0

        file.writelines([
            f"- {result['index']}:\n",
            f"    name: {result['name']}\n",
            f"    type: {result['type']}\n",
            f"    xp: {result['xp']}\n",
            f"    api_url: {result['url']}\n",
            f"    alignment: {result['alignment']}\n"
            f"    str: {result['strength']}\n",
            f"    dex: {result['dexterity']}\n",
            f"    con: {result['constitution']}\n",
            f"    int: {result['intelligence']}\n",
            f"    wis: {result['wisdom']}\n",
            f"    cha: {result['charisma']}\n",
            f"    stealth: {stealth}\n",

        ])

