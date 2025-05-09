import {forest, forestOptions} from './forest';
import {hills, hillsOptions} from './hills';
import {grassland, grasslandOptions} from './grassland';
import {dungeon, dungeonOptions} from './dungeon';
import {caves, cavesOptions} from './caves';
import {swamp, swampOptions} from './swamp';
import {desert, desertOptions} from './desert';
import {mountains, mountainsOptions} from './mountains';
import {arctic, arcticOptions} from './arctic';
import {coast, coastOptions} from './coast';
import {underworld, underworldOptions} from './underworld';
const all_environs = [forest, hills, grassland, dungeon, caves, swamp, desert, mountains, arctic, coast, underworld];
        
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
			<option value="dungeon" selected="selected">Dungeon</option>,
			<option value="caves">Caves</option>,
			<option value="swamp">Swamp</option>,
			<option value="desert">Desert</option>,
			<option value="mountains">Mountains</option>,
			<option value="arctic">Arctic</option>,
			<option value="coast">Coast</option>,
			<option value="underworld">Underworld</option>,
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
			} else if (environ === "swamp") {
				setter(swampOptions());
			} else if (environ === "desert") {
				setter(desertOptions());
			} else if (environ === "mountains") {
				setter(mountainsOptions());
			} else if (environ === "arctic") {
				setter(arcticOptions());
			} else if (environ === "coast") {
				setter(coastOptions());
			} else if (environ === "underworld") {
				setter(underworldOptions());
			}
		}

        export function randomFamily(environ) {
            let random = Math.floor(Math.random() * Object.keys(environ).length);
            return environ[Object.keys(environ)[random]];
        }
        
        export function getFamily(monsterSelection) {
            if (monsterSelection === ""){
                monsterSelection = "anyDungeon";
                document.getElementById("monster-type").value = "anyDungeon";
            }
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
            
            } else if (monsterSelection === "anySwamp") {
                monsterFamily = randomFamily(swamp);
            
            } else if (monsterSelection === "anyDesert") {
                monsterFamily = randomFamily(desert);
            
            } else if (monsterSelection === "anyMountains") {
                monsterFamily = randomFamily(mountains);
            
            } else if (monsterSelection === "anyArctic") {
                monsterFamily = randomFamily(arctic);
            
            } else if (monsterSelection === "anyCoast") {
                monsterFamily = randomFamily(coast);
            
            } else if (monsterSelection === "anyUnderworld") {
                monsterFamily = randomFamily(underworld);
            	}
return monsterFamily
}
