import * as monsters from './monsters.js';
import * as families from './families.js';

const cavesSolos = {
	name: 'Other caves',
	type: 'solo',
	list: [
		monsters.rust_monster_mm_2024, 
		monsters.roper_mm_2024, 
		monsters.darkmantle_mm_2024, 
		monsters.ettin_mm_2024, 
		monsters.azer, 
		monsters.basilisk_mm_2024, 
		monsters.cloaker_mm_2024, 
		monsters.chimera_mm_2024, 
		monsters.gorgon_mm_2024, 
		monsters.owlbear_mm_2024, 
		monsters.brown_bear_mm_2024, 
		monsters.behir_mm_2024, 
		monsters.boar_mm_2024, 
		monsters.chimera_mm_2024, 
		monsters.chuul_mm_2024, 
		monsters.deep_gnome_svirfneblin, 
		monsters.earth_elemental_mm_2024, 
		monsters.ettercap_mm_2024, 
		monsters.giant_scorpion_mm_2024, 
		monsters.grimlock_mm_2024, 
		monsters.hill_giant_mm_2024, 
		monsters.manticore_mm_2024, 
		monsters.purple_worm_mm_2024, 
		monsters.troll_mm_2024, 
		monsters.ankheg_mm_2024, 
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
