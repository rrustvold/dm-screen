import * as monsters from './monsters.js';
import * as families from './families.js';

const coastSolos = {
	name: 'Other coast',
	type: 'solo',
	list: [
		monsters.merfolk, 
		monsters.sahuagin, 
		monsters.stirge, 
		monsters.sea_hag, 
		monsters.harpy, 
		monsters.manticore, 
		monsters.water_elemental, 
		monsters.cyclops, 
		monsters.banshee, 
		monsters.marid, 
		monsters.storm_giant, 
		monsters.giant_eagle, 
		monsters.carrion_crawler, 
		monsters.hydra, 
	]
}
export const coast = {
	snakes: families.snakes, 
	kobolds: families.kobolds, 
	coastal_coven: families.coastal_coven, 
	ogres: families.ogres, 
	coastsolos: coastSolos, 
}

export const coastOptions = () => {
	let options = [];
	for (const [key, value] of Object.entries(coast)) {
		options.push(
			<option value={key}>{value.name}</option>
		)
	}
	options.push(<option value='anyCoast'>Any Coast</option>);
	return options
}
