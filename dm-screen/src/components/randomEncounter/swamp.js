import * as monsters from './monsters.js';
import * as families from './families.js';

const swampSolos = {
	name: 'Other swamp',
	type: 'solo',
	list: [
		monsters.troll, 
		monsters.ettin, 
		monsters.crocodile, 
		monsters.swarm_of_insects, 
		monsters.stirge, 
		monsters.lizardfolk, 
		monsters.shambling_mound, 
		monsters.water_elemental, 
		monsters.bullywug, 
		monsters.hydra, 
		monsters.giant_crocodile, 
	]
}
export const swamp = {
	hags: families.hags, 
	rats: families.rats, 
	snakes: families.snakes, 
	yuan_tis: families.yuan_tis, 
	orcs: families.orcs, 
	undead: families.undead, 
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
