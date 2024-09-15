import * as monsters from './monsters.js';
import * as families from './families.js';

const arcticSolos = {
	name: 'Other arctic',
	type: 'solo',
	list: [
		monsters.giant_owl, 
		monsters.ice_mephit, 
		monsters.brown_bear, 
		monsters.griffon, 
		monsters.polar_bear, 
		monsters.manticore, 
		monsters.troll, 
		monsters.werebear_hybrid, 
		monsters.remorhaz, 
		monsters.mammoth, 
		monsters.frost_giant, 
	]
}
export const arctic = {
	kobolds: families.kobolds, 
	orcs: families.orcs, 
	ogres: families.ogres, 
	wolves: families.wolves, 
	arcticsolos: arcticSolos, 
}

export const arcticOptions = () => {
	let options = [];
	for (const [key, value] of Object.entries(arctic)) {
		options.push(
			<option value={key}>{value.name}</option>
		)
	}
	options.push(<option value='anyArctic'>Any Arctic</option>);
	return options
}
