import * as monsters from './monsters.js';
import * as families from './families.js';

const forestSolos = {
	name: 'Other forest',
	type: 'solo',
	list: [
		monsters.brown_bear, 
		monsters.carrion_crawler, 
		monsters.green_hag, 
		monsters.owlbear, 
		monsters.troll, 
		monsters.shambling_mound, 
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
