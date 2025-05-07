import * as monsters from './monsters.js';
import * as families from './families.js';

const arcticSolos = {
	name: 'Other arctic',
	type: 'solo',
	list: [
		monsters.giant_owl_mm_2024, 
		monsters.ice_mephit_mm_2024, 
		monsters.brown_bear_mm_2024, 
		monsters.griffon_mm_2024, 
		monsters.polar_bear_mm_2024, 
		monsters.manticore_mm_2024, 
		monsters.troll_mm_2024, 
		monsters.werebear_hybrid, 
		monsters.remorhaz_mm_2024, 
		monsters.mammoth_mm_2024, 
		monsters.frost_giant_mm_2024, 
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
