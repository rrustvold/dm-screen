import * as monsters from './monsters.js';
import * as families from './families.js';

const desertSolos = {
	name: 'Other desert',
	type: 'solo',
	list: [
		monsters.dust_mephit, 
		monsters.air_elemental, 
		monsters.cyclops, 
		monsters.fire_elemental, 
		monsters.medusa, 
		monsters.lamia, 
		monsters.efreeti, 
		monsters.purple_worm, 
		monsters.roc, 
		monsters.young_brass_dragon, 
		monsters.young_blue_dragon, 
		monsters.adult_brass_dragon, 
		monsters.adult_blue_dragon, 
		monsters.ancient_brass_dragon, 
		monsters.ancient_blue_dragon, 
		monsters.ankheg, 
	]
}
export const desert = {
	vultures: families.vultures, 
	snakes: families.snakes, 
	bugs: families.bugs, 
	gnolls: families.gnolls, 
	goblins: families.goblins, 
	kobolds: families.kobolds, 
	yuan_tis: families.yuan_tis, 
	ogres: families.ogres, 
	nagas: families.nagas, 
	desertsolos: desertSolos, 
}

export const desertOptions = () => {
	let options = [];
	for (const [key, value] of Object.entries(desert)) {
		options.push(
			<option value={key}>{value.name}</option>
		)
	}
	options.push(<option value='anyDesert'>Any Desert</option>);
	return options
}
