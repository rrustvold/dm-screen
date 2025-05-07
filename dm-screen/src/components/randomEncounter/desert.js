import * as monsters from './monsters.js';
import * as families from './families.js';

const desertSolos = {
	name: 'Other desert',
	type: 'solo',
	list: [
		monsters.dust_mephit_mm_2024, 
		monsters.air_elemental_mm_2024, 
		monsters.cyclops, 
		monsters.fire_elemental_mm_2024, 
		monsters.medusa_mm_2024, 
		monsters.lamia_mm_2024, 
		monsters.efreeti_mm_2024, 
		monsters.purple_worm_mm_2024, 
		monsters.roc_mm_2024, 
		monsters.young_brass_dragon_mm_2024, 
		monsters.young_blue_dragon_mm_2024, 
		monsters.adult_brass_dragon_mm_2024, 
		monsters.adult_blue_dragon_mm_2024, 
		monsters.ancient_brass_dragon_mm_2024, 
		monsters.ancient_blue_dragon_mm_2024, 
		monsters.ankheg_mm_2024, 
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
