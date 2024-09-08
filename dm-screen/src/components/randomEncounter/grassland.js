import * as monsters from './monsters.js';
import * as families from './families.js';

const grasslandSolos = {
	name: 'Other grassland',
	type: 'solo',
	list: [
		monsters.manticore, 
		monsters.carrion_crawler, 
		monsters.ankheg, 
		monsters.chimera, 
		monsters.cockatrice, 
		monsters.bulette, 
		monsters.brown_bear, 
		monsters.cyclops, 
		monsters.gorgon, 
	]
}
export const grassland = {
	orcs: families.orcs, 
	goblins: families.goblins, 
	gnolls: families.gnolls, 
	snakes: families.snakes, 
	wolves: families.wolves, 
	vultures: families.vultures, 
	grasslandsolos: grasslandSolos, 
}

export const grasslandOptions = () => {
	let options = [];
	for (const [key, value] of Object.entries(grassland)) {
		options.push(
			<option value={key}>{value.name}</option>
		)
	}
	options.push(<option value='anyGrassland'>Any Grassland</option>);
	return options
}
