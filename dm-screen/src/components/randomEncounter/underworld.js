import * as monsters from './monsters.js';
import * as families from './families.js';

const underworldSolos = {
	name: 'Other underworld',
	type: 'solo',
	list: [
		monsters.troglodyte, 
		monsters.darkmantle_mm_2024, 
		monsters.magma_mephit_mm_2024, 
		monsters.rust_monster_mm_2024, 
		monsters.carrion_crawler, 
		monsters.gargoyle_mm_2024, 
		monsters.gibbering_mouther_mm_2024, 
		monsters.grick_mm_2024, 
		monsters.intellect_devourer, 
		monsters.nothic, 
		monsters.grell, 
		monsters.hell_hound_mm_2024, 
		monsters.hook_horror, 
		monsters.minotaur, 
		monsters.drow, 
		monsters.phase_spider_mm_2024, 
		monsters.water_weird, 
		monsters.chuul_mm_2024, 
		monsters.ettin_mm_2024, 
		monsters.flameskull, 
		monsters.earth_elemental_mm_2024, 
		monsters.otyugh_mm_2024, 
		monsters.roper_mm_2024, 
		monsters.salamander_mm_2024, 
		monsters.troll_mm_2024, 
		monsters.umber_hulk, 
		monsters.xorn_mm_2024, 
		monsters.chimera_mm_2024, 
		monsters.cyclops, 
		monsters.mind_flayer, 
		monsters.stone_giant_mm_2024, 
		monsters.fire_giant_mm_2024, 
		monsters.behir_mm_2024, 
		monsters.purple_worm_mm_2024, 
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
