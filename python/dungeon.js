import * as monsters from './monsters.js';
import * as families from './families.js';

const dungeonSolos = {
	name: 'Other dungeon',
	type: 'solo',
	list: [
		monsters.rust_monster, 
		monsters.roper, 
		monsters.darkmantle, 
		monsters.ettin, 
		monsters.otyugh, 
		monsters.azer, 
		monsters.basilisk, 
		monsters.swarm_of_insects, 
		monsters.cloaker, 
		monsters.chimera, 
		monsters.minotaur, 
		monsters.gorgon, 
		monsters.deep_gnome_svirfneblin, 
		monsters.ettercap, 
		monsters.flying_sword, 
		monsters.gibbering_mouther, 
		monsters.grimlock, 
		monsters.manticore, 
		monsters.medusa, 
		monsters.mimic, 
		monsters.rug_of_smothering, 
	]
}
export const dungeon = {
	kobolds: families.kobolds, 
	goblins: families.goblins, 
	snakes: families.snakes, 
	rats: families.rats, 
	drows: families.drows, 
	gricks: families.gricks, 
	ogres: families.ogres, 
	undead: families.undead, 
	fiends: families.fiends, 
	bats: families.bats, 
	oozes: families.oozes, 
	golems: families.golems, 
	mephits: families.mephits, 
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