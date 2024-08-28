
import {forest} from "./environs/forest";
import {hills} from "./environs/hills";
import {grassland} from "./environs/grassland";


const all_environs = [forest, hills, grassland];

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
    console.log(options);
    return options
}