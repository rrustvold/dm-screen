import {getRandomThingFromList} from "../../utils";
import {RandomEntrance} from "./RandomEntrance";
import {airList, smellList} from "./RandomDressing";


const Ruler = [
    "Beholder",
    "Mind Flayer",
    "Behir",
    "Dragon",
    "Lich",
    "Dread Knight",
    "Devil",
    "Demon",
];

export const PrimaryInhabitant = [
    "Goblins",
    "Ogres",
    "Devils",
    "Demons",
    "Hags",
    "Undead",
    "Drow",
    "Duergar",
    "Deep Gnomes",
    "Giants",
    "Yuan-ti",
];

export const SecondaryInhabitant = [
    "Displacer Beasts",
    "Hell Hounds",
    "Undead",
    "Goblins",
    "Kobolds",
    "Snakes",
    "Gnolls",
    "Spiders",
    "Cultists (drow, druegar, deep gnomes, or humans)",
];

export function getRandomTheme() {
    return (
        <>
            <p>Entrance: {getRandomThingFromList(RandomEntrance)}</p>
            <p>Ruler: {getRandomThingFromList(Ruler)}</p>
            <p>Primary Inhabitant: {getRandomThingFromList(PrimaryInhabitant)}</p>
            <p>Secondary Inhabitant: {getRandomThingFromList(SecondaryInhabitant)}</p>
            <p>Air: {getRandomThingFromList(airList)}</p>
            <p>Odor: {getRandomThingFromList(smellList)}</p>
        </>
    )
}