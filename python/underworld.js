import * as monsters from './monsters.js';
import * as families from './families.js';

const underworldSolos = {
	name: 'Other underworld',
	type: 'solo',
	list: [
		monsters.giant_fire_beetle, 
		monsters.troglodyte, 
		monsters.darkmantle, 
		monsters.magma_mephit, 
		monsters.rust_monster, 
		monsters.carrion_crawler, 
		monsters.gargoyle, 
		monsters.gibbering_mouther, 
		monsters.grick, 
		monsters.intellect_devourer, 
		monsters.nothic, 
		monsters.grell, 
		monsters.hell_hound, 
		monsters.hook_horror, 
		monsters.minotaur, 
		monsters.drow, 
		monsters.phase_spider, 
		monsters.water_weird, 
		monsters.chuul, 
		monsters.ettin, 
		monsters.flameskull, 
		monsters.earth_elemental, 
		monsters.otyugh, 
		monsters.roper, 
		monsters.salamander, 
		monsters.troll, 
		monsters.umber_hulk, 
		monsters.xorn, 
		monsters.chimera, 
		monsters.cyclops, 
		monsters.mind_flayer, 
		monsters.stone_giant, 
		monsters.fire_giant, 
		monsters.behir, 
		monsters.purple_worm, 
	]
}
export const underworld = {
	bugs: families.bugs, 
	spiders: families.spiders, 
	kobolds: families.kobolds, 
	kuo_toas: families.kuo_toas, 
	snakes: families.snakes, 
	oozes: families.oozes, 
	goblins: families.goblins, 
	undead: families.undead, 
	nagas: families.nagas, 
	driders: families.driders, 
	gricks: families.gricks, 
	underworldsolos: underworldSolos, 
}

export const underworldOptions = () => {
	let options = [];
	for (const [key, value] of Object.entries(underworld)) {
		options.push(
			<option value={key}>{value.name}</option>
		)
	}
	options.push(<option value='anyUnderworld'>Any Underworld</option>);
	return options
}
