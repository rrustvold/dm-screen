import {orcs} from "../orcs";
import {goblins} from "../goblins";
import {kobolds} from "../kobolds";
import {vultures} from "../vultures";
import {brown_bear, carrion_crawler, hill_giant, manticore, harpy} from "../miscellaneous";

const hillsSolos = {
    name: "Other Hills",
    type: "solo",
    list: [
        hill_giant,
        manticore,
        brown_bear,
        harpy,
        carrion_crawler,
    ]
}
export const hills = {
    orcs: orcs,
    goblins: goblins,
    kobolds: kobolds,
    vultures: vultures,
    hillsSolos: hillsSolos,
}

export const hillsOptions = () => {
    let options = [];
    for (const [key, value] of Object.entries(hills)) {
        options.push(
            <option value={key}>{value.name}</option>
        )
    }
    options.push(
        <option value="anyHills">Any Hills</option>
    )

    return options
}