import * as monsters from './monsters.js';
import * as families from './families.js';

const dungeonSolos = {
	name: 'Other dungeon',
	type: 'solo',
	list: [
		monsters.rust_monster_mm_2024, 
		monsters.roper_mm_2024, 
		monsters.darkmantle_mm_2024, 
		monsters.ettin_mm_2024, 
		monsters.otyugh_mm_2024, 
		monsters.azer, 
		monsters.basilisk_mm_2024, 
		monsters.swarm_of_insects_mm_2024, 
		monsters.cloaker_mm_2024, 
		monsters.chimera_mm_2024, 
		monsters.minotaur, 
		monsters.gorgon_mm_2024, 
		monsters.deep_gnome_svirfneblin, 
		monsters.ettercap_mm_2024, 
		monsters.flying_sword, 
		monsters.gibbering_mouther_mm_2024, 
		monsters.grimlock_mm_2024, 
		monsters.manticore_mm_2024, 
		monsters.medusa_mm_2024, 
		monsters.mimic_mm_2024, 
		monsters.displacer_beast, 
		monsters.beholder, 
		monsters.mind_flayer, 
	]
}
export const dungeon = {
	kobolds: families.kobolds, 
	goblins: families.goblins, 
	snakes: families.snakes, 
	rats: families.rats, 
	spiders: families.spiders, 
	kuo_toas: families.kuo_toas, 
	duergar: families.duergar, 
	drows: families.drows, 
	gricks: families.gricks, 
	ogres: families.ogres, 
	undead: families.undead, 
	fiends: families.fiends, 
	bats: families.bats, 
	oozes: families.oozes, 
	golems: families.golems, 
	animated_objects: families.animated_objects, 
	mephits: families.mephits, 
	bugs: families.bugs, 
	dungeonsolos: dungeonSolos, 
}

export const dungeonOptions = () => {
	let options = [];
	for (const [key, value] of Object.entries(dungeon)) {
		options.push(
			<option value={key}>{value.name}</option>
		)
	}
	options.push(<option value='anyDungeon'>Any Dungeon</option>);
	return options
}
