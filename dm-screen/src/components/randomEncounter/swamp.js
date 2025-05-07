import * as monsters from './monsters.js';
import * as families from './families.js';

const swampSolos = {
	name: 'Other swamp',
	type: 'solo',
	list: [
		monsters.troll_mm_2024, 
		monsters.ettin_mm_2024, 
		monsters.crocodile_mm_2024, 
		monsters.swarm_of_insects_mm_2024, 
		monsters.stirge_mm_2024, 
		monsters.lizardfolk, 
		monsters.shambling_mound_mm_2024, 
		monsters.water_elemental_mm_2024, 
		monsters.bullywug, 
		monsters.hydra_mm_2024, 
		monsters.giant_crocodile_mm_2024, 
		monsters.carrion_crawler, 
	]
}
export const swamp = {
	hags: families.hags, 
	rats: families.rats, 
	snakes: families.snakes, 
	yuan_tis: families.yuan_tis, 
	orcs: families.orcs, 
	undead: families.undead, 
	bugs: families.bugs, 
	swampsolos: swampSolos, 
}

export const swampOptions = () => {
	let options = [];
	for (const [key, value] of Object.entries(swamp)) {
		options.push(
			<option value={key}>{value.name}</option>
		)
	}
	options.push(<option value='anySwamp'>Any Swamp</option>);
	return options
}
