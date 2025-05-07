import * as monsters from './monsters.js';
import * as families from './families.js';

const hillsSolos = {
	name: 'Other hills',
	type: 'solo',
	list: [
		monsters.hill_giant_mm_2024, 
		monsters.manticore_mm_2024, 
		monsters.brown_bear_mm_2024, 
		monsters.harpy_mm_2024, 
		monsters.carrion_crawler, 
		monsters.worg_mm_2024, 
		monsters.ettin_mm_2024, 
		monsters.cyclops, 
		monsters.stone_giant_mm_2024, 
		monsters.earth_elemental_mm_2024, 
		monsters.griffon_mm_2024, 
		monsters.wyvern_mm_2024, 
		monsters.stone_giant_mm_2024, 
		monsters.green_hag_mm_2024, 
		monsters.troll_mm_2024, 
	]
}
export const hills = {
	orcs: families.orcs, 
	goblins: families.goblins, 
	kobolds: families.kobolds, 
	vultures: families.vultures, 
	wolves: families.wolves, 
	gnolls: families.gnolls, 
	ogres: families.ogres, 
	hillssolos: hillsSolos, 
}

export const hillsOptions = () => {
	let options = [];
	for (const [key, value] of Object.entries(hills)) {
		options.push(
			<option value={key}>{value.name}</option>
		)
	}
	options.push(<option value='anyHills'>Any Hills</option>);
	return options
}
