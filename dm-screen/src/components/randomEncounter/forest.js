import * as monsters from './monsters.js';
import * as families from './families.js';

const forestSolos = {
	name: 'Other forest',
	type: 'solo',
	list: [
		monsters.brown_bear_mm_2024, 
		monsters.carrion_crawler, 
		monsters.green_hag_mm_2024, 
		monsters.owlbear_mm_2024, 
		monsters.troll_mm_2024, 
		monsters.shambling_mound_mm_2024, 
		monsters.ankheg_mm_2024, 
		monsters.displacer_beast, 
		monsters.displacer_beast, 
		monsters.gorgon_mm_2024, 
		monsters.treant_mm_2024, 
	]
}
export const forest = {
	orcs: families.orcs, 
	goblins: families.goblins, 
	spiders: families.spiders, 
	gricks: families.gricks, 
	dryads: families.dryads, 
	gnolls: families.gnolls, 
	snakes: families.snakes, 
	driders: families.driders, 
	wolves: families.wolves, 
	gricks: families.gricks, 
	ogres: families.ogres, 
	nagas: families.nagas, 
	bugs: families.bugs, 
	blights: families.blights, 
	yuan_tis: families.yuan_tis, 
	forestsolos: forestSolos, 
}

export const forestOptions = () => {
	let options = [];
	for (const [key, value] of Object.entries(forest)) {
		options.push(
			<option value={key}>{value.name}</option>
		)
	}
	options.push(<option value='anyForest'>Any Forest</option>);
	return options
}
