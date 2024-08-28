import {orcs} from "../orcs";
import {gnolls, goblins} from "../goblins";
import {spiders} from "../spiders";
import {
    brown_bear,
    carrion_crawler,
    dryads,
    green_hag,
    gricks,
    owlbear, snakes, troll
} from "../miscellaneous";

const forestSolos = {
    name: "Other Forest",
    type: "solo",
    list: [
        owlbear,
        brown_bear,
        green_hag,
        carrion_crawler,
        troll,
    ]
}
export const forest = {
    orcs: orcs,
    goblins: goblins,
    spiders: spiders,
    forestSolos: forestSolos,
    gricks: gricks,
    dryads: dryads,
    gnolls: gnolls,
    snakes: snakes,
}


export const forestOptions = () => {
    let options = [];
    for (const [key, value] of Object.entries(forest)) {
        options.push(
            <option value={key}>{value.name}</option>
        )
    }
    options.push(<option value="anyForest">Any Forest</option>)

    return options
}