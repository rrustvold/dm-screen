import requests

url = "https://www.dnd5eapi.co/api/monsters"

payload = {}
headers = {
  'Accept': 'application/json'
}

response = requests.request("GET", url, headers=headers, data=payload)

with open("all_monster.yaml", "w") as file:
    for monster in response.json()["results"]:
        response2 = requests.request("GET", url + f"/{monster["index"]}", headers=headers)
        result = response2.json()
        file.writelines([
            f"- {result['index']}:\n",
            f"    name: {result['name']}\n",
            f"    type: {result['type']}\n",
            f"    xp: {result['xp']}\n",
            f"    api_url: {result['url']}\n"
        ])

