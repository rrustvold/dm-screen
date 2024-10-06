import yaml
import json
import os

monster_keys = set()
with open("api_monsters.yaml", "r") as file:
    monsters = yaml.safe_load(file)

with open("my_monsters.yaml", "r") as file:
    my_monsters = yaml.safe_load(file)

for monster in monsters + my_monsters:
    key = list(monster.keys())[0]
    monster_keys.add(key)
    monster_keys.add(key.replace("-", "_"))


with open("families.yaml", "r") as file:
    families = yaml.safe_load(file)

family_keys = [list(family.keys())[0] for family in families]

with open("environs.yaml", "r") as file:
    environs = yaml.safe_load(file)

# Compile all monsters into js
file_dir = os.path.dirname(os.path.abspath(__file__))
src_dir = os.path.dirname(file_dir)
monsters_file = os.path.join(src_dir, *"/dm-screen/src/components/randomEncounter/monsters.js".split("/"))
with open(monsters_file, "w") as file:
    for monster in monsters + my_monsters:
        key = list(monster.keys())[0]
        try:
            name = monster[key]["name"]
        except KeyError:
            name = key.capitalize()

        xp = monster[key]["xp"]
        _int = monster[key].get("int", 0)
        dex = monster[key].get("dex", 0)
        stealth = monster[key].get("stealth", 0)
        link = monster[key].get("link", f"https://www.dndbeyond.com/monsters/{key}")
        key = key.replace("-", "_")
        file.writelines([
            "export const %s = {\n" % key,
            "\tkey: '%s',\n" % key,
            "\tname: '%s',\n" % name,
            "\txp: %d,\n" % xp,
            "\tlink: '%s',\n" % link,
            "\tint: %d,\n" % _int,
            "\tdex: %d,\n" % dex,
            "\tstealth: %d,\n" % stealth,
            "}\n\n"
        ])

# Compile all families
families_file = os.path.join(src_dir, *"/dm-screen/src/components/randomEncounter/families.js".split("/"))
with open(families_file, "w") as file:
    file.writelines([
        "import * as monsters from './monsters.js';\n\n"
    ])
    for family in families:
        key = list(family.keys())[0]
        name = key.capitalize()
        file.writelines([
            "export const %s = {\n" % key.replace("-", "_"),
            "\tname: '%s',\n" % name,
            "\tlist: [\n\t\t",
        ])
        for value in family[key]:
            if value in monster_keys:
                file.write(f"monsters.{value.replace("-", "_")}, ")
            else:
                print(f"Warning: {value} not in monsters")

        file.writelines([
            "\n",
            "\t]\n",
            "}\n\n"
        ])

# Compile all environs
for environ in environs:
    key = list(environ.keys())[0]
    values = environ[key]

    environment_file = os.path.join(src_dir, *f"/dm-screen/src/components/randomEncounter/{key}.js".split("/"))
    with open(environment_file, "w") as file:
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
                if value in monster_keys:
                    file.write(f"\t\tmonsters.{value.replace("-", "_")}, \n")
                else:
                    print(f"Warning: {value} not in monsters")

        file.writelines([
            "\t]\n",
            "}\n"
            "export const %s = {\n" % key,
        ])

        for value in values:
            if value in family_keys:
                file.write(f"\t{value.replace("-", "_")}: families.{value.replace("-", "_")}, \n")

        file.write(
            "\t%ssolos: %sSolos, \n" % (key, key)
        )

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

environs_file = os.path.join(src_dir, *"/dm-screen/src/components/randomEncounter/Environs.js".split("/"))
with open(environs_file, "w") as file:
    all_envs = [list(x.keys())[0] for x in environs]
    for environ in all_envs:
        file.write(
            "import {%s, %sOptions} from './%s';\n" % (environ, environ, environ)
        )

    file.write(f"const all_environs = [{', '.join(all_envs)}];")
    file.write(
        """
        
        export const allLists = () => {
            let all = {}
            for (let i=0; i < all_environs.length; i++) {
                for (const [key, value] of Object.entries(all_environs[i])) {
                    all[key] = value;
                }
            }
            return all
        }
        
        export const allOptions = () => {
            let options = [];
            for (let i=0; i < all_environs; i++) {
                for (const [key, value] of Object.entries(all_environs[i])) {
                    options.push(
                        <option value={key}>{value.name}</option>
                    )
                }
            }
            return options
        }
        
        
        export const allEnvirons = [
        """
    )

    for environ in all_envs:
        file.write(f'\t\t\t<option value="{environ}">{environ.capitalize()}</option>,\n')

    file.write("\t\t]\n\n")

    file.write(
        """
        export function changeEnviron(environ, setter) {
            if (environ === "any") {
                setter(
                    allOptions()
                )
        """
    )

    for environ in all_envs:
        file.writelines([
            '\t\t\t} else if (environ === "%s") {\n' % environ,
            '\t\t\t\tsetter(%sOptions());\n' % environ,
        ])

    file.writelines([
        "\t\t\t}\n",
        "\t\t}\n"
    ])

    file.write(
        """
        export function randomFamily(environ) {
            let random = Math.floor(Math.random() * Object.keys(environ).length);
            return environ[Object.keys(environ)[random]];
        }
        """
    )

    environ = all_envs[0]
    file.write(
        """
        export function getFamily(monsterSelection) {
            let monsterFamily = allLists()[monsterSelection];
            if (monsterSelection === "any%s") {
                monsterFamily = randomFamily(%s);
        """ % (environ.capitalize(), environ)
    )
    for environ in all_envs[1:]:
        file.write(
            """
            } else if (monsterSelection === "any%s") {
                monsterFamily = randomFamily(%s);
            """ %(environ.capitalize(), environ)
        )

    file.write("\t}\n")
    file.write("return monsterFamily\n")
    file.write("}\n")


