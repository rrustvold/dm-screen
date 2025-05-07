import * as monsters from './monsters.js';
import * as families from './families.js';

const mountainsSolos = {
	name: 'Other mountains',
	type: 'solo',
	list: [
		monsters.stirge_mm_2024, 
		monsters.harpy_mm_2024, 
		monsters.hippogriff_mm_2024, 
		monsters.griffon_mm_2024, 
		monsters.peryton, 
		monsters.hell_hound_mm_2024, 
		monsters.manticore_mm_2024, 
		monsters.ettin_mm_2024, 
		monsters.air_elemental_mm_2024, 
		monsters.bulette_mm_2024, 
		monsters.troll_mm_2024, 
		monsters.chimera_mm_2024, 
		monsters.cyclops, 
		monsters.galeb_duhr, 
		monsters.wyvern_mm_2024, 
		monsters.stone_giant_mm_2024, 
		monsters.frost_giant_mm_2024, 
		monsters.cloud_giant_mm_2024, 
		monsters.fire_giant_mm_2024, 
	]
}
export const mountains = {
	kobolds: families.kobolds, 
	orcs: families.orcs, 
	lesser_goblins: families.lesser_goblins, 
	ogres: families.ogres, 
	mountainssolos: mountainsSolos, 
}

export const mountainsOptions = () => {
	let options = [];
	for (const [key, value] of Object.entries(mountains)) {
		options.push(
			<option value={key}>{value.name}</option>
		)
	}
	options.push(<option value='anyMountains'>Any Mountains</option>);
	return options
}
