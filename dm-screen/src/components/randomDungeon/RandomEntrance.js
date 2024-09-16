


const forest = [
    "A waterfall conceals a narrow cave entrance behind the rushing waters.",
    "An ancient tree with hollow roots leads to a dark tunnel beneath the forest floor.",
    "A stone well with a hidden ladder descending deep underground.",
    "A moss-covered boulder that slides away when a specific rune is pressed.",
    "A ruined altar with a secret trapdoor beneath the crumbled stones.",
    "A camouflaged pit hidden under leaves, leading to an underground passage.",
    "A tree stump that swivels, revealing stairs descending into the earth.",
    "A cave hidden behind a thicket of thorny bushes, obscured from view.",
    "A buried iron door uncovered by shifting dirt and roots, locked tight with ancient mechanisms.",
    "A rockslide covers a large entrance, requiring strength to move the rocks.",
    "An overgrown archway built into the hillside, covered in vines and moss.",
    "A small pond with a submerged tunnel that leads to the dungeon below.",
    "A ring of standing stones, with one stone hiding a secret door beneath it.",
    "A fallen log, under which a hidden trapdoor leads to an underground network.",
    "A forest clearing where the grass seems unnaturally short, concealing an entrance beneath.",
    "A massive root system with a hidden entryway between two large roots.",
    "A hidden lever on a tree trunk that opens a disguised entrance in the ground.",
    "A dense bramble thicket that parts to reveal a staircase descending into darkness.",
    "A hollowed-out cave beneath a massive fallen tree, leading into the dungeon below.",
    "A stone circle at the base of an ancient oak tree, where pressing the center stone reveals a spiraling staircase."
];

const hills = [
    "A hidden cave mouth at the base of a steep cliff, partially obscured by loose rocks.",
    "A large boulder rolls aside to reveal a narrow tunnel descending into the hillside.",
    "An old mine entrance boarded up and forgotten, with broken planks and rusted tools nearby.",
    "A crevice between two jagged rocks, just wide enough for a person to squeeze through.",
    "A hidden hatch beneath a grassy knoll, disguised to blend in with the surroundings.",
    "A spiral staircase carved into the side of a cliff, leading down into darkness.",
    "A crumbling watchtower with a secret basement entrance hidden beneath the rubble.",
    "A weathered statue of a warrior, with a trapdoor at the base leading underground.",
    "A crack in the earth, wide enough to descend into a hidden cavern below.",
    "A hidden cave behind a waterfall that flows from a high ridge, masking the entrance.",
    "A tunnel hidden in the shadow of a large rock formation, barely visible from the road.",
    "An ancient cairn of stones that, when removed, reveals an entrance to a tomb beneath.",
    "A forgotten door set into the hillside, with rusted hinges and a faded symbol of protection.",
    "A series of stone steps cut into the hill, leading to an underground fortress.",
    "A sinkhole that has opened up in the hillside, exposing a buried stone archway.",
    "A thicket of thorn bushes hides a tunnel dug into the side of a hill.",
    "A narrow ravine, with a path leading to a concealed cave at its base.",
    "A hidden door behind a hanging ivy curtain, built into the hill itself.",
    "A massive, overgrown stone slab that can be pushed aside to reveal a staircase underneath.",
    "An old, abandoned windmill atop a hill, with a trapdoor leading down into catacombs."
  ];
  
  const swamp = [
    "A sunken stone doorway, half-submerged in murky water, with vines and algae clinging to its frame.",
    "An overgrown tree with hollow roots leading to a dark tunnel beneath the swampy ground.",
    "A hidden hatch covered by thick layers of moss and swamp muck, leading to an underground chamber.",
    "A cave entrance concealed by a tangle of reeds and thick swamp grass, barely visible above the waterline.",
    "An ancient well surrounded by crumbling stone, leading deep underground through a network of flooded tunnels.",
    "A rotting wooden door at the base of a massive cypress tree, hidden behind a curtain of hanging moss.",
    "A cracked stone obelisk, partially buried in the mud, with an opening beneath it that descends into the earth.",
    "A series of stone steps submerged in swamp water, leading to a submerged temple entrance.",
    "A narrow tunnel hidden beneath a mound of mud and roots, only revealed when the swamp floods recede.",
    "A decayed, vine-covered archway leading into the ground, with the smell of rot wafting from within.",
    "A cluster of small islands in the swamp, one of which hides a trapdoor leading into an ancient ruin.",
    "A large, gnarled tree stump with a hollow center, masking a vertical shaft descending into the earth.",
    "A half-sunken shipwreck that contains a hidden entrance leading to submerged caverns.",
    "A stone door covered in strange runes, buried in the muck at the edge of a swampy lagoon.",
    "An abandoned hunting lodge built on stilts, with a trapdoor in the floor leading to catacombs beneath.",
    "A patch of quicksand hides a hidden tunnel entrance, revealed only when the muck is cleared away.",
    "A series of rotting wooden planks forming a bridge over the swamp, with a trapdoor concealed at the center.",
    "A massive hollow log with an entrance at one end, leading into a dark passageway below the swamp.",
    "A hidden cave entrance beneath a fallen tree, submerged and only accessible when the water levels are low.",
    "A stone circle jutting out of the swamp, with one stone that, when moved, reveals a spiral staircase below."
  ];
  
  const grassland = [
    "A hidden trapdoor concealed beneath tall, waving grasses, nearly invisible unless closely inspected.",
    "A stone circle in the middle of a field, with one stone that can be shifted to reveal a staircase beneath.",
    "An old, overgrown well with a ladder descending into darkness, hidden in the middle of an empty plain.",
    "A small cave opening in a lone rocky outcrop, leading into a vast underground complex.",
    "A large stone slab hidden under a mound of grass, which slides away to reveal a tunnel entrance.",
    "An ancient standing stone, covered in runes, with a hidden door at its base leading underground.",
    "A simple dirt mound with an entrance hidden by woven grass, concealing a passageway beneath.",
    "A camouflaged pit in the middle of a wide-open field, leading to an underground network of tunnels.",
    "A sunken entrance hidden by tall grass, leading into the ruins of an ancient subterranean fortress.",
    "A weathered stone monument, which when pressed, opens a hidden door in the ground nearby.",
    "A hillock in the middle of the grasslands with a secret door at the top, leading into the depths below.",
    "A long-forgotten farmhouse, with a cellar door leading into a hidden dungeon beneath the earth.",
    "A thicket of bushes hiding a trapdoor, carefully covered in grass to disguise the entrance.",
    "A lone tree in the middle of the plains, with an entrance hidden in its roots that leads underground.",
    "A stone arch hidden among the grass, leading to a set of steps descending into an ancient vault.",
    "A cluster of rocks in the grasslands, one of which can be moved to reveal a concealed tunnel.",
    "A hollow beneath a small hill, with an entrance hidden by thick grass and dirt, leading to an underground cavern.",
    "A trapdoor concealed by wildflowers, leading into a network of tunnels used by smugglers long ago.",
    "An ancient cairn on a windswept plain, where removing the stones reveals a dungeon entrance.",
    "A crumbling, moss-covered statue in the grasslands with a hidden compartment leading to a dungeon below."
  ];
  
  const coast = [
    "A hidden sea cave, accessible only during low tide, with an entrance obscured by crashing waves.",
    "A shipwreck partially buried in the sand, leading to an underwater dungeon through the hull.",
    "A stone staircase carved into the cliffs, descending into a hidden grotto beneath the shoreline.",
    "A sunken treasure chest that, when opened, reveals a trapdoor leading below the ocean floor.",
    "An ancient lighthouse with a secret tunnel beneath the foundation, leading deep underground.",
    "A submerged temple, revealed only when the tide goes out, with barnacle-covered stone doors.",
    "A hidden cove accessible only by boat, with a cave entrance at the far end leading to a dungeon.",
    "A coral reef hiding a secret entrance beneath its colorful surface, leading to submerged caverns.",
    "A seaweed-covered boulder that rolls aside to reveal a staircase descending into the sand.",
    "A cave entrance hidden in the side of a sea cliff, only accessible via a narrow, dangerous path.",
    "A tidal pool with a hidden tunnel leading beneath the seabed, connecting to an ancient ruin.",
    "A sun-bleached skeleton clutching a map to a hidden dungeon, the entrance buried in the dunes.",
    "A storm-damaged dock with a trapdoor leading into a series of flooded chambers below.",
    "A long-abandoned pirate hideout, with a secret underground passage leading to lost treasure.",
    "A jagged reef with a submerged entrance, accessible only by swimming through treacherous waters.",
    "A cave system carved by the waves, leading into a labyrinthine dungeon beneath the cliffs.",
    "A hidden alcove behind a waterfall cascading off the cliffs, concealing an ancient dungeon entrance.",
    "A ship's graveyard with wreckage piled high, hiding a hidden entrance to an underwater complex.",
    "A crumbling fort perched on a cliffside, with a secret passage leading to the depths below.",
    "A forgotten smugglers' tunnel concealed beneath shifting sands on the beach."
  ];
  
  const mountains = [
    "A narrow mountain pass leading to a cave, hidden high among the peaks.",
    "A stone door set into the mountainside, carved with ancient dwarven runes.",
    "A crack in the cliff face, barely wide enough to slip through, leading to a hidden cave system.",
    "A hidden crevasse covered by snow, leading to a cavern far beneath the mountain.",
    "A giant boulder blocking a tunnel entrance, which can be moved with great strength.",
    "A crumbling stone bridge spanning a ravine, with a hidden door beneath the bridge's foundation.",
    "A waterfall cascading down the mountainside, concealing a cave entrance behind it.",
    "A series of ladders and ropes leading to a hidden cave perched on a cliffside.",
    "An ancient dwarven mine entrance, long-abandoned, leading deep into the heart of the mountain.",
    "A hidden staircase carved into the rock, leading up to an ancient fortress buried in the mountain.",
    "A jagged ravine with a cave at its base, only accessible by climbing down a sheer cliff face.",
    "A frost-covered cave hidden high in the mountains, its entrance blocked by ice and snow.",
    "A stone tower on a mountain ridge with a secret entrance leading to underground chambers.",
    "A narrow trail that leads to a hidden door in the cliffside, marked with barely visible symbols.",
    "A collapsed mine shaft with a hidden side passage leading into a forgotten vault.",
    "A large crack in the mountainside caused by an earthquake, revealing a hidden dungeon entrance.",
    "A cave hidden behind a dense thicket of mountain pine, leading to an underground network.",
    "A glacier with a cave beneath it, slowly melting to reveal an ancient, forgotten entrance.",
    "A ruined mountain fortress with a trapdoor leading to deep catacombs below.",
    "A narrow tunnel winding through the mountain, its entrance disguised by natural rock formations."
  ];
  
  const arctic = [
    "An ice cave concealed beneath a thick snowdrift, its entrance shimmering in the frost.",
    "A glacier with a massive crevasse, leading to a hidden ice dungeon beneath the frozen surface.",
    "A frozen lake with an entrance beneath the ice, accessible only by breaking through.",
    "An ancient stone cairn half-buried in snow, marking the entrance to a buried tomb.",
    "A snow-covered mound with a hidden hatch leading underground, disguised by layers of ice.",
    "A series of ice tunnels that lead deep beneath the frozen tundra, only visible when the ice cracks.",
    "A cave entrance blocked by frozen stalactites, hiding an ancient dungeon beneath the ice.",
    "A trapdoor buried beneath permafrost, leading to an underground network of frost-covered chambers.",
    "An old ship frozen in the ice, with a secret passage leading down into the ice caverns below.",
    "A cave hidden in a glacial shelf, only accessible during warmer months when the ice recedes.",
    "A mysterious igloo that, when entered, reveals a staircase leading deep into the earth.",
    "A crack in the ice shelf revealing a long-forgotten tomb beneath the frozen surface.",
    "An ancient burial mound covered in frost, hiding a tunnel that descends into the icy depths.",
    "A frozen waterfall, with an entrance behind the ice curtain, leading to a frozen dungeon.",
    "An ice cliff with a narrow passage carved by the wind, leading to a cave hidden within.",
    "A polar bear's den that, when explored further, leads into an ancient ice-bound dungeon.",
    "A frozen-over temple entrance carved into a mountainside, hidden beneath layers of snow.",
    "An iceberg with a hollow core, hiding an entrance to a submerged dungeon beneath the arctic waters.",
    "A series of icy tunnels beneath a snow-covered plain, accessible through a hidden sinkhole.",
    "An ancient stone arch buried in ice, leading to a dungeon frozen in time."
  ];

  const desert = [
    "A hidden cave entrance beneath a large sand dune, revealed only when the winds shift.",
    "An ancient, weathered stone doorway in the side of a canyon wall, half-buried in sand.",
    "A collapsed ruin in the desert, with a trapdoor leading into the depths below.",
    "A narrow crevice in a rocky outcrop, leading into a hidden underground labyrinth.",
    "A sunken temple entrance, mostly buried beneath the desert sands, only its top visible.",
    "A desert well that, when descended, leads to a network of subterranean tunnels.",
    "A shifting sandpit that hides a concealed hatch leading to an underground complex.",
    "A crumbling stone arch in the middle of the desert, with a staircase descending into the sand.",
    "An oasis with a cave hidden behind a waterfall, leading to an underground water-filled dungeon.",
    "A half-buried obelisk with a secret passage hidden beneath its base.",
    "A forgotten tomb entrance revealed by shifting dunes, its doors covered in hieroglyphs.",
    "A sand-blasted ruin with a trapdoor hidden under broken tiles, leading to a crypt below.",
    "A canyon floor with a hidden tunnel entrance, disguised by swirling sands.",
    "An ancient statue buried in sand, with an entrance hidden beneath its base.",
    "A dried-up riverbed revealing a cave entrance carved into the canyon wall.",
    "A crumbling stone pyramid with a concealed entrance on the shaded side, leading underground.",
    "A cave hidden behind a large rock formation in the desert, leading into a forgotten tomb.",
    "A hidden vault entrance concealed beneath a layer of compacted sand and rocks.",
    "An old, abandoned caravanserai with a trapdoor leading into an underground network of tunnels.",
    "A series of sandstone pillars, one of which hides a staircase descending deep into the earth."
  ];

  const underworld = [
    "A bottomless pit that opens into a series of underground caverns, leading to the underworld.",
    "A glowing portal hidden deep in a cave, shimmering with dark energy, opening a path to the underworld.",
    "A crevice in the ground, its entrance glowing faintly with an eerie red light, descending into the depths.",
    "A vast chasm splitting the earth, with a narrow stone bridge leading across to an entrance below.",
    "A series of tunnels burrowed by unknown creatures, spiraling downward into the underworld.",
    "A cave filled with strange, bioluminescent fungi, hiding an ancient stairwell leading down.",
    "A jagged crack in the earth, with thick, noxious fumes rising from the underworld beneath.",
    "A stone arch covered in demonic runes, marking the entrance to a realm of darkness below.",
    "A lava tube that descends deep beneath the earth, leading to fiery caverns within the underworld.",
    "A cavern entrance guarded by stone gargoyles, said to be the gateway to the underworld.",
    "A massive, gaping hole in the ground, with unnatural heat and sulfuric air rising from the depths.",
    "A forgotten tomb with a trapdoor beneath the sarcophagus, leading to the underworld's labyrinth.",
    "A swirling vortex of dark energy, hovering above a cave floor, serving as a gateway to the underworld.",
    "A blackened cave, scorched by unknown forces, leading to fiery and treacherous paths below.",
    "A hidden underground river, flowing into the abyss and disappearing into the underworld's depths.",
    "A cavern with walls of obsidian, glistening in the dark, marking the threshold to the underworld.",
    "A cracked stone altar, which when activated, opens a portal descending into the realms below.",
    "A long-abandoned mine shaft with a hidden passage that leads directly into the underworld.",
    "A spiraling staircase carved out of bone, descending into the shadowy depths of the underworld.",
    "A forgotten temple, with a secret door in its depths leading to a hellish underworld beneath."
  ];
  
const generic = [
    "The entrance lies near the bottom of an abandoned moss-covered well. In the well’s interior wall, fifteen feet down, muddy bricks protrude slightly in a spiral downward allowing agile characters to get the sixty feet to the bottom where a secret door grants entry to the dungeon. The bottom of the well is filled with a few inches of rainwater and a few feet of thick mud. Those who fall in ignore the first 10 feet of falling damage.",
    "A circle of magical runes large enough for an average wagon with a team of horses encloses images of clouds and birds painted onto the floor. A faint breeze of cold, fresh air blows from the circle. Speaking the correct command while in the circle causes the creature to disappear and reappear in the dungeon.",
    "A tumbled-down two-story tower of grey stone is perched upon a low mound in a foggy moor. Broken arrow shafts, rusty swords, and bleached bones poke through the soggy soil for hundreds of feet around the hill. Within, the tower is entirely empty but for a skeleton seated at a simple table, an empty bottle of wine before it, and a fine longbow at its side. An iron key that opens a nearby trapdoor hangs from a leather thong around the skeleton's neck.",
    "A worked tunnel protrudes the length of a spear into the side of the dirt mound, its entrance covered in moss and vines while a putrid sludge flows rapidly out onto the wet, muddy ground. The stonework is chipped and worn, suggesting it is very old. A scream, or possibly some strange bird call, echoes from deep within.",
    "The entrance is a broad hole located on the side of a steep cliff. A rickety wood and rope elevator, sized for six man-sized creatures, has been rigged to provide access. It may, or may not, be safe or it could even be sabotaged.",
    "The entrance is a set of stairs behind a locked portcullis below an abandoned arena. A statue of a phoenix is carved into the wall above the portcullis. The statue radiates faint magic, but does not hinder the PCs’ explorations.",
    "To prevent admission to the dungeon, the entrance is inside a traditional fortified keep, which is surrounded by a crenulated wall. A water-filled moat with a raised drawbridge surrounds the keep. From the outside, the keep seems abandoned.",
    "The entrance is at the end of a box canyon. Thirty feet across with walls more than sixty feet high, the approach is littered with boulders large enough for cover and a thick fog provides concealment. Two huge iron-bound doors of timber are ajar with the left door hanging solely by one hinge. Enemies could lurk anywhere...",
    "A crude, cracked brick roadway is disappearing beneath the sands and is only visible here and there. It leads to a natural cave in an outcropping of rock that stands out prominently in the desert. A primitive painting in white outside the cave depicts a stickman holding a spear and several four-legged creatures, each with a single horn and long tails.",
    "The entrance is behind a shelf of old, dusty books in a large library. It opens by pulling on the correct book.",
    "A line of square marble columns marches toward a grand archway. Above the entrance, a frieze depicts a bearded man lounging upon a stone while golden birds bring him bunches of grapes.",
    "A broad staircase of black stone rises to a door of iron, painted bright red and covered in dripping blue runes. The door pierces a wall of plain stone and radiates significant heat, requiring those that approach to risk nausea and fatigue.",
    "The entrance to the dungeon, a round door with a ship's wheel in the center, is in a grand hall with walls carved to depict stone ships sailing out of the walls towards the middle of the hall. The floor is of dark blue tiles and the room is strangely filled with the scent of sea air.",
    "A soaring narrow bridge crosses a grand chasm to a gate of golden bars. The bridge rises at a steep grade to the higher side, making it difficult to see what lies beyond the gate. On either side of the bridge are a pair of statues in the shape of winged lions; one stands rampant while the other has its mouth wide in a feral roar.",
    "Built into the side of a hill, a low moss-roofed cottage protrudes as far as a horse. A candle flickers beyond a clouded glass window, barely visible past the gnarled trees and thorny bushes. Sickly herbs grow in boxes under the windows. Rustling in the underbrush and the reflection of small eyes suggest the land is alive with fauna that are not at all disturbed by the PCs’ approach.",
    "Glowing blue lichen and large mushrooms line the cavern, growing out of the soft loamy soil. A pale white vine grows along the ground, through bones of small animals. Water drips from the ceiling like a slow steady rain, making conversation difficult.",
];


export function RandomEntrance(environ){
    switch (environ.toLowerCase()){
        case "forest":
            return forest;
        case "hills":
            return hills;
        case "swamp":
            return swamp;
        case "coast":
            return coast;
        case "mountains":
            return mountains;
        case "grassland":
            return grassland;
        case "arctic":
            return arctic;
        case "desert":
            return desert;
        case "underworld":
            return underworld;
        default:
            return generic
    }
}