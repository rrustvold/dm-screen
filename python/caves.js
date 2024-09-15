import * as monsters from './monsters.js';
import * as families from './families.js';

const cavesSolos = {
	name: 'Other caves',
	type: 'solo',
	list: [
		monsters.rust_monster, 
		monsters.roper, 
		monsters.darkmantle, 
		monsters.ettin, 
		monsters.azer, 
		monsters.basilisk, 
		monsters.cloaker, 
		monsters.chimera, 
		monsters.gorgon, 
		monsters.owlbear, 
		monsters.brown_bear, 
		monsters.behir, 
		monsters.boar, 
		monsters.chimera, 
		monsters.chuul, 
		monsters.deep_gnome_svirfneblin, 
		monsters.earth_elemental, 
		monsters.ettercap, 
		monsters.giant_scorpion, 
		monsters.grimlock, 
		monsters.hill_giant, 
		monsters.manticore, 
		monsters.purple_worm, 
		monsters.troll, 
		monsters.ankheg, 
		monsters.troglodyte, 
	]
}
export const caves = {
	kobolds: families.kobolds, 
	goblins: families.goblins, 
	rats: families.rats, 
	duergar: families.duergar, 
	gricks: families.gricks, 
	ogres: families.ogres, 
	oozes: families.oozes, 
	wolves: families.wolves, 
	spiders: families.spiders, 
	gnolls: families.gnolls, 
	bugs: families.bugs, 
	cavessolos: cavesSolos, 
}

export const cavesOptions = () => {
	let options = [];
	for (const [key, value] of Object.entries(caves)) {
		options.push(
			<option value={key}>{value.name}</option>
		)
	}
	options.push(<option value='anyCaves'>Any Caves</option>);
	return options
}
