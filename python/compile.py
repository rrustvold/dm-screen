import yaml
import json

with open("monsters.yaml", "r") as file:
    monsters = yaml.safe_load(file)

with open("families.yaml", "r") as file:
    families = yaml.safe_load(file)

family_keys = [list(family.keys())[0] for family in families]


with open("environs.yaml", "r") as file:
    environs = yaml.safe_load(file)

# Compile all monsters into js
with open("monsters.js", "w") as file:
    for monster in monsters:
        key = list(monster.keys())[0]
        try:
            name = monster[key]["name"]
        except KeyError:
            name = key.capitalize()

        xp = monster[key]["xp"]
        file.writelines([
            "export const %s = {\n" % key,
            "\tkey: '%s',\n" % key,
            "\tname: '%s',\n" % name,
            "\txp: %d,\n" % xp,
            "}\n\n"
        ])

# Compile all families
with open("families.js", "w") as file:
    file.writelines([
        "import * as monsters from './monsters.js';\n\n"
    ])
    for family in families:
        key = list(family.keys())[0]
        name = key.capitalize()
        file.writelines([
            "export const %s = {\n" % key,
            "\tname: '%s',\n" % name,
            "\tlist: [\n\t\t",
        ])
        for value in family[key]:
            file.write(f"monsters.{value}, ")
        file.writelines([
            "\n",
            "\t]\n",
            "}\n\n"
        ])

# Compile all environs
for environ in environs:
    key = list(environ.keys())[0]
    values = environ[key]

    with open(f"{key}.js", "w") as file:
        file.write("import * as monsters from './monsters.js';\n")
        file.write("import * as families from './families.js';\n\n")
        file.writelines([
            "const %sSolos = {\n" % key,
            "\tname: 'Other %s',\n" % key,
            "\ttype: 'solo',\n",
            "\tlist: [\n"
        ])
        for value in values:
            if value not in family_keys:
                file.write(f"\t\tmonsters.{value}, \n")

        file.writelines([
            "\t]\n",
            "}\n"
            "export const %s = {\n" % key,
        ])

        for value in values:
            if value in family_keys:
                file.write(f"\t{value}: families.{value}, \n")

        file.write("}\n\n")

        file.writelines([
            "export const %sOptions = () => {\n" % key,
            "\tlet options = [];\n",
            "\tfor (const [key, value] of Object.entries(%s)) {\n" %key,
            "\t\toptions.push(\n",
            "\t\t\t<option value={key}>{value.name}</option>\n",
            "\t\t)\n",
            "\t}\n"
            "\toptions.push(<option value='any%s'>Any %s</option>);\n" %(key.capitalize(), key.capitalize()),
            "\treturn options\n",
            "}\n"
        ])


