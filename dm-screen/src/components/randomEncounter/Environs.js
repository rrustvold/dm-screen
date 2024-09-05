import {forest, forestOptions} from './forest';
import {hills, hillsOptions} from './hills';
import {grassland, grasslandOptions} from './grassland';
import {dungeon, dungeonOptions} from './dungeon';
import {caves, cavesOptions} from './caves';
const all_environs = [forest, hills, grassland, dungeon, caves];

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
        			<option value="forest">Forest</option>,
			<option value="hills">Hills</option>,
			<option value="grassland">Grassland</option>,
			<option value="dungeon">Dungeon</option>,
			<option value="caves">Caves</option>,
		]


        export function changeEnviron(environ, setter) {
            if (environ === "any") {
                setter(
                    allOptions()
                )
        			} else if (environ === "forest") {
				setter(forestOptions());
			} else if (environ === "hills") {
				setter(hillsOptions());
			} else if (environ === "grassland") {
				setter(grasslandOptions());
			} else if (environ === "dungeon") {
				setter(dungeonOptions());
			} else if (environ === "caves") {
				setter(cavesOptions());
			}
		}

        export function randomFamily(environ) {
            console.log("hello");
            console.log(environ);
            let random = Math.floor(Math.random() * Object.keys(environ).length);
            return environ[Object.keys(environ)[random]];
        }

        export function getFamily(monsterSelection) {
            let monsterFamily = allLists()[monsterSelection];
            if (monsterSelection === "anyForest") {
                monsterFamily = randomFamily(forest);

            } else if (monsterSelection === "anyHills") {
                monsterFamily = randomFamily(hills);

            } else if (monsterSelection === "anyGrassland") {
                monsterFamily = randomFamily(grassland);

            } else if (monsterSelection === "anyDungeon") {
                monsterFamily = randomFamily(dungeon);

            } else if (monsterSelection === "anyCaves") {
                monsterFamily = randomFamily(caves);
            	}
return monsterFamily
}
