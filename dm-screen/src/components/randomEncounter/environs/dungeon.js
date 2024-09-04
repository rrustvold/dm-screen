import {spiders} from "../spiders";
import {
    gricks,
    grimlock,
    hellhound,
    rust_monster,
    snakes,
    troglodyte
} from "../miscellaneous";
import {kobolds} from "../kobolds";

const dungeonSolos = {
    name: "Other Dungeon",
    type: "solo",
    list: [
        troglodyte,
        rust_monster,
        grimlock,
        hellhound,
    ]
}

export const dungeon = {
    spiders: spiders,
    snakes: snakes,
    gricks: gricks,
    kobolds: kobolds,

}

export const dungeonOptions = () => {
    let options = [];
    for (const [key, value] of Object.entries(dungeon)) {
        options.push(
            <option value={key}>{value.name}</option>
        )
    }
    options.push(<option value="anyDungeon">Any Dungeon</option>)

    return options
}