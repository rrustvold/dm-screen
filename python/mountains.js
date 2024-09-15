import * as monsters from './monsters.js';
import * as families from './families.js';

const mountainsSolos = {
	name: 'Other mountains',
	type: 'solo',
	list: [
		monsters.stirge, 
		monsters.harpy, 
		monsters.hippogriff, 
		monsters.griffon, 
		monsters.peryton, 
		monsters.hell_hound, 
		monsters.manticore, 
		monsters.ettin, 
		monsters.air_elemental, 
		monsters.bulette, 
		monsters.troll, 
		monsters.chimera, 
		monsters.cyclops, 
		monsters.galeb_duhr, 
		monsters.wyvern, 
		monsters.stone_giant, 
		monsters.frost_giant, 
		monsters.cloud_giant, 
		monsters.fire_giant, 
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
