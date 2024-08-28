import {orcs, wolves} from "../orcs";
import {gnolls, goblins} from "../goblins";
import {
    brown_bear,
    carrion_crawler,
    manticore,
    ankheg, chimera, cockatrice, bulette, cyclops, snakes
} from "../miscellaneous";

const grasslandSolos = {
    name: "Other Grassland",
    type: "solo",
    list: [
        manticore,
        carrion_crawler,
        ankheg,
        chimera,
        cockatrice,
        bulette,
        brown_bear,
        cyclops,
    ]
}
export const grassland = {
    orcs: orcs,
    goblins: goblins,
    gnolls: gnolls,
    wolves: wolves,
    snakes: snakes,
    grasslandSolos: grasslandSolos,
}

export const grasslandOptions = () => {
    let options = [];
    for (const [key, value] of Object.entries(grassland)) {
        options.push(
            <option value={key}>{value.name}</option>
        )
    }
    options.push(
        <option value="anyGrassland">Any Grassland</option>
    )

    return options
}