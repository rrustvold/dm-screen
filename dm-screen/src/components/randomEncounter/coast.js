import * as monsters from './monsters.js';
import * as families from './families.js';

const coastSolos = {
	name: 'Other coast',
	type: 'solo',
	list: [
		monsters.merfolk, 
		monsters.sahuagin, 
		monsters.stirge_mm_2024, 
		monsters.sea_hag_mm_2024, 
		monsters.harpy_mm_2024, 
		monsters.manticore_mm_2024, 
		monsters.water_elemental_mm_2024, 
		monsters.cyclops, 
		monsters.banshee, 
		monsters.marid, 
		monsters.storm_giant_mm_2024, 
		monsters.giant_eagle_mm_2024, 
		monsters.carrion_crawler, 
		monsters.hydra_mm_2024, 
	]
}
export const coast = {
	snakes: families.snakes, 
	kobolds: families.kobolds, 
	coastal_coven: families.coastal_coven, 
	ogres: families.ogres, 
	coastsolos: coastSolos, 
}

export const coastOptions = () => {
	let options = [];
	for (const [key, value] of Object.entries(coast)) {
		options.push(
			<option value={key}>{value.name}</option>
		)
	}
	options.push(<option value='anyCoast'>Any Coast</option>);
	return options
}
