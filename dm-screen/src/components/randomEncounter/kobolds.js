import {worg} from "./orcs";


export const kobold = {
    key: "kobold",
    name: "Kobold",
    xp: 25,
}

export const winged_kobold = {
    key: "winged-kobold",
    name: "Winged Kobold",
    xp: 50,
}

export const kobolds = {
    name: "Kobolds",
    list: [
        kobold, kobold, kobold, winged_kobold, worg
    ]
}
