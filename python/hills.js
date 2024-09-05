import * as monsters from './monsters.js';
import * as families from './families.js';

const hillsSolos = {
	name: 'Other hills',
	type: 'solo',
	list: [
		monsters.hill_giant, 
		monsters.manticore, 
		monsters.brown_bear, 
		monsters.harpy, 
		monsters.carrion_crawler, 
	]
}
export const hills = {
	orcs: families.orcs, 
	goblins: families.goblins, 
	kobolds: families.kobolds, 
	vultures: families.vultures, 
	wolves: families.wolves, 
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
