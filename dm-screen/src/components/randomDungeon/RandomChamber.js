export function randomShape() {
    let roll = Math.floor(Math.random() * 20) + 1;
    if (roll >= 1 && roll <= 2) {
        return "Square, 20 × 20 ft.";
    } else if (roll >= 3 && roll <= 4) {
        return "Square, 30 × 30 ft.";
    } else if (roll >= 5 && roll <= 6) {
        return "Square, 40 × 40 ft.";
    } else if (roll >= 7 && roll <= 9) {
        return "Rectangle, 20 × 30 ft.";
    } else if (roll >= 10 && roll <= 12) {
        return "Rectangle, 30 × 40 ft.";
    } else if (roll >= 13 && roll <= 14) {
        return "Rectangle, 40 × 50 ft.";
    } else if (roll === 15) {
        return "Rectangle, 50 × 80 ft.";
    } else if (roll === 16) {
        return "Circle, 30 ft. diameter";
    } else if (roll === 17) {
        return "Circle, 50 ft. diameter";
    } else if (roll === 18) {
        return "Octagon, 40 × 40 ft.";
    } else if (roll === 19) {
        return "Octagon, 60 × 60 ft.";
    } else if (roll === 20) {
        return "Trapezoid, roughly 40 × 60 ft.";
    } else {
        return "Invalid roll";
    }
}

export function randomExits() {
    let roll = Math.floor(Math.random() * 20) + 1;
    let numExits = 0;
    if (roll <= 5) {
        numExits = 0;
    } else if (roll <= 11) {
        numExits = 1;
    } else if (roll <= 15) {
        numExits = 2;
    } else if (roll <= 18) {
        numExits = 3;
    } else if (roll <= 20) {
        numExits = 4;
    }
    let numDoors = 0;
    let numPassages = 0;
    for (let i=0; i < numExits; i++) {
        let roll = Math.floor(Math.random() * 2) + 1;
        if (roll == 1) {
            numDoors++;
        } else {
            numPassages++;
        }
    }
    return [numDoors, numPassages]
}


 export function randomContents() {
    let roll = Math.floor(Math.random() * 100) + 1;
    if (roll <= 8) {
      return "Monster (dominant inhabitant)";
    } else if (roll <= 15) {
        return "Monster (dominant inhabitant) with treasure";
    } else if (roll <= 27) {
        return "Monster (pet or ally)";
    } else if (roll <= 33) {
        return "Monster (pet or ally) guarding treasure";
    } else if (roll <= 42) {
        return "Monster (random)";
    } else if (roll <= 50) {
        return "Monster (random) with treasure";
    } else if (roll <= 58) {
        return "Dungeon Hazard";
    } else if (roll <= 63) {
        return "Obstacle";
    } else if (roll <= 73) {
        return "Trap";
    } else if (roll <= 76) {
        return "Trap with treasure";
    } else if (roll <= 80) {
        return "Trick";
    } else if (roll <= 88) {
        return "Empty";
    } else if (roll <= 94) {
        return "Hazard";
    } else if (roll <= 100) {
        return "Treasure";
    }
  }

export  function randomState() {
    let roll = Math.floor(Math.random() * 20) + 1;
    if (roll <= 3) {
      return "Rubble, ceiling partially collapsed";
    } else if (roll <= 5) {
        return "Holes, floor partially collapsed";
    } else if (roll <= 7) {
        return "Ashes, contents mostly burned";
    } else if (roll <= 9) {
        return "Used as a campsite";
    } else if (roll <= 11) {
        return "Pool of water; chamber’s original contents are water damaged";
    } else if (roll <= 16) {
        return "Furniture wrecked but still present";
    } else if (roll <= 18) {
        return `Converted to some other use: ${randomPurpose("general")}`;
    } else if (roll <= 19) {
        return "Stripped bare";
    } else if (roll <= 20) {
        return "Pristine and in original state";
    }
  }

export  function randomPurpose(dungeonType) {
    function general(){
      let roll = Math.floor(Math.random() * 100) + 1;
      if (roll <= 1) {
          return "Antechamber";
      } else if (roll <= 3) {
          return "Armory";
      } else if (roll <= 4) {
          return "Audience chamber";
      } else if (roll <= 5) {
          return "Aviary";
      } else if (roll <= 7) {
          return "Banquet room";
      } else if (roll <= 10) {
          return "Barracks";
      } else if (roll <= 11) {
          return "Bath or latrine";
      } else if (roll <= 12) {
          return "Bedroom";
      } else if (roll <= 13) {
          return "Bestiary";
      } else if (roll <= 16) {
          return "Cell";
      } else if (roll <= 17) {
          return "Chantry";
      } else if (roll <= 18) {
          return "Chapel";
      } else if (roll <= 20) {
          return "Cistern";
      } else if (roll <= 21) {
          return "Classroom";
      } else if (roll <= 22) {
          return "Closet";
      } else if (roll <= 24) {
          return "Conjuring room";
      } else if (roll <= 26) {
          return "Court";
      } else if (roll <= 29) {
          return "Crypt";
      } else if (roll <= 31) {
          return "Dining room";
      } else if (roll <= 33) {
          return "Divination room";
      } else if (roll <= 34) {
          return "Dormitory";
      } else if (roll <= 35) {
          return "Dressing room";
      } else if (roll <= 36) {
          return "Entry room or vestibule";
      } else if (roll <= 38) {
          return "Gallery";
      } else if (roll <= 40) {
          return "Game room";
      } else if (roll <= 43) {
          return "Guardroom";
      } else if (roll <= 45) {
          return "Hall";
      } else if (roll <= 47) {
          return "Hall, great";
      } else if (roll <= 49) {
          return "Hallway";
      } else if (roll <= 50) {
          return "Kennel";
      } else if (roll <= 52) {
          return "Kitchen";
      } else if (roll <= 54) {
          return "Laboratory";
      } else if (roll <= 57) {
          return "Library";
      } else if (roll <= 59) {
          return "Lounge";
      } else if (roll <= 60) {
          return "Meditation chamber";
      } else if (roll <= 61) {
          return "Observatory";
      } else if (roll <= 62) {
          return "Office";
      } else if (roll <= 64) {
          return "Pantry";
      } else if (roll <= 66) {
          return "Pen or prison";
      } else if (roll <= 68) {
          return "Reception room";
      } else if (roll <= 70) {
          return "Refectory";
      } else if (roll <= 71) {
          return "Robing room";
      } else if (roll <= 72) {
          return "Salon";
      } else if (roll <= 74) {
          return "Shrine";
      } else if (roll <= 76) {
          return "Sitting room";
      } else if (roll <= 78) {
          return "Smithy";
      } else if (roll <= 79) {
          return "Stable";
      } else if (roll <= 81) {
          return "Storage room";
      } else if (roll <= 83) {
          return "Strong room or vault";
      } else if (roll <= 85) {
          return "Study";
      } else if (roll <= 88) {
          return "Temple";
      } else if (roll <= 90) {
          return "Throne room";
      } else if (roll <= 91) {
          return "Torture chamber";
      } else if (roll <= 93) {
          return "Training or exercise room";
      } else if (roll <= 95) {
          return "Trophy room or museum";
      } else if (roll <= 96) {
          return "Waiting room";
      } else if (roll <= 97) {
          return "Nursery or schoolroom";
      } else if (roll <= 98) {
          return "Well";
      } else if (roll <= 100) {
          return "Workshop";
      }
    }
    function lair(){
      let roll = Math.floor(Math.random() * 20) + 1;
      if (roll === 1) {
        return "Armory stocked with weapons and armor";
    } else if (roll === 2) {
        return "Audience chamber, used to receive guests";
    } else if (roll === 3) {
        return "Banquet room for important celebrations";
    } else if (roll === 4) {
        return "Barracks where the lair’s defenders are quartered";
    } else if (roll === 5) {
        return "Bedroom, for use by leaders";
    } else if (roll === 6) {
        return "Chapel where the lair’s inhabitants worship";
    } else if (roll === 7) {
        return "Cistern or well for drinking water";
    } else if (roll <= 9) {
        return "Guardroom for the defense of the lair";
    } else if (roll === 10) {
        return "Kennel for pets or guard beasts";
    } else if (roll === 11) {
        return "Kitchen for food storage and preparation";
    } else if (roll === 12) {
        return "Pen or prison where captives are held";
    } else if (roll <= 14) {
        return "Storage, mostly nonperishable goods";
    } else if (roll === 15) {
        return "Throne room where the lair’s leaders hold court";
    } else if (roll === 16) {
        return "Torture chamber";
    } else if (roll === 17) {
        return "Training and exercise room";
    } else if (roll === 18) {
        return "Trophy room or museum";
    } else if (roll === 19) {
        return "Latrine or bath";
    } else if (roll === 20) {
        return "Workshop for the construction of weapons, armor, tools, and other goods";
    }
    }
    function maze(){
      let roll = Math.floor(Math.random() * 20) + 1;
      if (roll === 1) {
        return "Conjuring room, used to summon creatures that guard the maze";
    } else if (roll <= 5) {
        return "Guardroom for sentinels that patrol the maze";
    } else if (roll <= 10) {
        return "Lair for guard beasts that patrol the maze";
    } else if (roll === 11) {
        return "Pen or prison accessible only by secret door, used to hold captives condemned to the maze";
    } else if (roll === 12) {
        return "Shrine dedicated to a god or other entity";
    } else if (roll <= 14) {
        return "Storage for food, as well as tools used by the maze’s guardians to keep the complex in working order";
    } else if (roll <= 18) {
        return "Trap to confound or kill those sent into the maze";
    } else if (roll === 19) {
        return "Well that provides drinking water";
    } else if (roll === 20) {
        return "Workshop where doors, torch sconces, and other furnishings are repaired and maintained";
    }
    }
    function mine(){
      let roll = Math.floor(Math.random() * 20) + 1;
      if (roll <= 2) {
        return "Barracks for miners";
    } else if (roll === 3) {
        return "Bedroom for a supervisor or manager";
    } else if (roll === 4) {
        return "Chapel dedicated to a patron deity of miners, earth, or protection";
    } else if (roll === 5) {
        return "Cistern providing drinking water for miners";
    } else if (roll <= 7) {
        return "Guardroom";
    } else if (roll === 8) {
        return "Kitchen used to feed workers";
    } else if (roll === 9) {
        return "Laboratory used to conduct tests on strange minerals extracted from the mine";
    } else if (roll <= 15) {
        return "Lode where metal ore is mined (75 percent chance of being depleted)";
    } else if (roll === 16) {
        return "Office used by the mine supervisor";
    } else if (roll === 17) {
        return "Smithy for repairing damaged tools";
    } else if (roll <= 19) {
        return "Storage for tools and other equipment";
    } else if (roll === 20) {
        return "Strong room or vault used to store ore for transport to the surface";
    }
    }
    function planarGate(){
      let roll = Math.floor(Math.random() * 100) + 1;
      if (roll <= 3) {
        return "Decorated foyer or antechamber";
    } else if (roll <= 8) {
        return "Armory used by the portal’s guardians";
    } else if (roll <= 10) {
        return "Audience chamber for receiving visitors";
    } else if (roll <= 19) {
        return "Barracks used by the portal’s guards";
    } else if (roll <= 23) {
        return "Bedroom for use by the high-ranking members of the order that guards the portal";
    } else if (roll <= 30) {
        return "Chapel dedicated to a deity or deities related to the portal and its defenders";
    } else if (roll <= 35) {
        return "Cistern providing fresh water";
    } else if (roll <= 38) {
        return "Classroom for use of initiates learning about the portal’s secrets";
    } else if (roll === 39) {
        return "Conjuring room for summoning creatures used to investigate or defend the portal";
    } else if (roll <= 41) {
        return "Crypt where the remains of those that died guarding the portal are kept";
    } else if (roll <= 47) {
        return "Dining room";
    } else if (roll <= 50) {
        return "Divination room used to investigate the portal and events tied to it";
    } else if (roll <= 55) {
        return "Dormitory for visitors and guards";
    } else if (roll <= 57) {
        return "Entry room or vestibule";
    } else if (roll <= 59) {
        return "Gallery for displaying trophies and objects related to the portal and those that guard it";
    } else if (roll <= 67) {
        return "Guardroom to protect or watch over the portal";
    } else if (roll <= 72) {
        return "Kitchen";
    } else if (roll <= 77) {
        return "Laboratory for conducting experiments relating to the portal and creatures that emerge from it";
    } else if (roll <= 80) {
        return "Library holding books about the portal’s history";
    } else if (roll <= 85) {
        return "Pen or prison for holding captives or creatures that emerge from the portal";
    } else if (roll <= 87) {
        return "Planar junction, where the gate to another plane once stood (25 percent chance of being active)";
    } else if (roll <= 90) {
        return "Storage";
    } else if (roll === 91) {
        return "Strong room or vault, for guarding valuable treasures connected to the portal or funds used to pay the planar gate’s guardians";
    } else if (roll <= 93) {
        return "Study";
    } else if (roll === 94) {
        return "Torture chamber, for questioning creatures that pass through the portal or that attempt to clandestinely use it";
    } else if (roll <= 98) {
        return "Latrine or bath";
    } else if (roll <= 100) {
        return "Workshop for constructing tools and gear needed to study the portal";
    }
    
    }
    function stronghold(){
      let roll = Math.floor(Math.random() * 100) + 1;
      if (roll <= 2) {
        return "Antechamber where visitors seeking access to the stronghold wait";
    } else if (roll <= 5) {
        return "Armory holding high-quality gear, including light siege weapons such as ballistas";
    } else if (roll === 6) {
        return "Audience chamber used by the master of the stronghold to receive visitors";
    } else if (roll === 7) {
        return "Aviary or zoo for keeping exotic creatures";
    } else if (roll <= 11) {
        return "Banquet room for hosting celebrations and guests";
    } else if (roll <= 15) {
        return "Barracks used by elite guards";
    } else if (roll === 16) {
        return "Bath outfitted with a marble floor and other luxurious accoutrements";
    } else if (roll === 17) {
        return "Bedroom for use by the stronghold’s master or important guests";
    } else if (roll === 18) {
        return "Chapel dedicated to a deity associated with the stronghold’s master";
    } else if (roll <= 21) {
        return "Cistern providing drinking water";
    } else if (roll <= 25) {
        return "Dining room for intimate gatherings or informal meals";
    } else if (roll === 26) {
        return "Dressing room featuring a number of wardrobes";
    } else if (roll <= 29) {
        return "Gallery for the display of expensive works of art and trophies";
    } else if (roll <= 32) {
        return "Game room used to entertain visitors";
    } else if (roll <= 50) {
        return "Guardroom";
    } else if (roll === 51) {
        return "Kennel where monsters or trained animals that protect the stronghold are kept";
    } else if (roll <= 57) {
        return "Kitchen designed to prepare exotic foods for large numbers of guests";
    } else if (roll <= 61) {
        return "Library with an extensive collection of rare books";
    } else if (roll === 62) {
        return "Lounge used to entertain guests";
    } else if (roll <= 70) {
        return "Pantry, including cellar for wine or spirits";
    } else if (roll <= 74) {
        return "Sitting room for family and intimate guests";
    } else if (roll <= 78) {
        return "Stable";
    } else if (roll <= 86) {
        return "Storage for mundane goods and supplies";
    } else if (roll === 87) {
        return "Strong room or vault for protecting important treasures (75 percent chance of being hidden behind a secret door)";
    } else if (roll <= 92) {
        return "Study, including a writing desk";
    } else if (roll === 93) {
        return "Throne room, elaborately decorated";
    } else if (roll <= 96) {
        return "Waiting room where lesser guests are held before receiving an audience";
    } else if (roll <= 98) {
        return "Latrine or bath";
    } else if (roll <= 100) {
        return "Crypt belonging to the stronghold’s master or someone else of importance";
    }
    
    }
    function temple(){
      let roll = Math.floor(Math.random() * 100) + 1;
      if (roll <= 3) {
        return "Armory filled with weapons and armor, battle banners, and pennants";
    } else if (roll <= 5) {
        return "Audience chamber where priests of the temple receive commoners and low-ranking visitors";
    } else if (roll <= 7) {
        return "Banquet room used for celebrations and holy days";
    } else if (roll <= 10) {
        return "Barracks for the temple’s military arm or its hired guards";
    } else if (roll <= 14) {
        return "Cells where the faithful can sit in quiet contemplation";
    } else if (roll <= 24) {
        return "Central temple built to accommodate rituals";
    } else if (roll <= 28) {
        return "Chapel dedicated to a lesser deity associated with the temple’s major deity";
    } else if (roll <= 31) {
        return "Classroom used to train initiates and priests";
    } else if (roll <= 34) {
        return "Conjuring room, specially sanctified and used to summon extraplanar creatures";
    } else if (roll <= 40) {
        return "Crypt for a high priest or similar figure, hidden and heavily guarded by creatures and traps";
    } else if (roll <= 42) {
        return "Dining room (large) for the temple’s servants and lesser priests";
    } else if (roll === 43) {
        return "Dining room (small) for the temple’s high priests";
    } else if (roll <= 46) {
        return "Divination room, inscribed with runes and stocked with soothsaying implements";
    } else if (roll <= 50) {
        return "Dormitory for lesser priests or students";
    } else if (roll <= 56) {
        return "Guardroom";
    } else if (roll === 57) {
        return "Kennel for animals or monsters associated with the temple’s deity";
    } else if (roll <= 60) {
        return "Kitchen (might bear a disturbing resemblance to a torture chamber in an evil temple)";
    } else if (roll <= 65) {
        return "Library, well stocked with religious treatises";
    } else if (roll <= 68) {
        return "Prison for captured enemies (in good or neutral temples) or those designated as sacrifices (in evil temples)";
    } else if (roll <= 73) {
        return "Robing room containing ceremonial outfits and items";
    } else if (roll === 74) {
        return "Stable for riding horses and mounts belonging to the temple, or for visiting messengers and caravans";
    } else if (roll <= 79) {
        return "Storage holding mundane supplies";
    } else if (roll === 80) {
        return "Strong room or vault holding important relics and ceremonial items, heavily trapped";
    } else if (roll <= 82) {
        return "Torture chamber, used in inquisitions (in good or neutral temples with a lawful bent) or for the sheer joy of causing pain (evil temples)";
    } else if (roll <= 89) {
        return "Trophy room where art celebrating key figures and events from mythology is displayed";
    } else if (roll === 90) {
        return "Latrine or bath";
    } else if (roll <= 94) {
        return "Well for drinking water, defendable in the case of attack or siege";
    } else if (roll <= 100) {
        return "Workshop for repairing or creating weapons, religious items, and tools";
    }
    
    }
    function tomb(){
      let roll = Math.floor(Math.random() * 20) + 1;
      if (roll === 1) {
        return "Antechamber for those that have come to pay respect to the dead or prepare themselves for burial rituals";
    } else if (roll <= 3) {
        return "Chapel dedicated to deities that watch over the dead and protect their resting places";
    } else if (roll <= 8) {
        return "Crypt for less important burials";
    } else if (roll === 9) {
        return "Divination room, used in rituals to contact the dead for guidance";
    } else if (roll === 10) {
        return "False crypt (trapped) to kill or capture thieves";
    } else if (roll === 11) {
        return "Gallery to display the deeds of the deceased through trophies, statues, paintings and so forth";
    } else if (roll === 12) {
        return "Grand crypt for a noble, high priest, or other important individual";
    } else if (roll <= 14) {
        return "Guardroom, usually guarded by undead, constructs, or other creatures that don’t need to eat or sleep";
    } else if (roll === 15) {
        return "Robing room for priests to prepare for burial rituals";
    } else if (roll <= 17) {
        return "Storage, stocked with tools for maintaining the tomb and preparing the dead for burial";
    } else if (roll === 18) {
        return "Tomb where the wealthiest and most important folk are interred, protected by secret doors and traps";
    } else if (roll <= 20) {
        return "Workshop for embalming the dead";
    }
    
    }
    function treasureVault(){
      let roll = Math.floor(Math.random() * 20) + 1;
      if (roll === 1) {
        return "Antechamber for visiting dignitaries";
    } else if (roll === 2) {
        return "Armory containing mundane and magic gear used by the treasure vault’s guards";
    } else if (roll <= 4) {
        return "Barracks for guards";
    } else if (roll === 5) {
        return "Cistern providing fresh water";
    } else if (roll <= 9) {
        return "Guardroom to defend against intruders";
    } else if (roll === 10) {
        return "Kennel for trained beasts used to guard the treasure vault";
    } else if (roll === 11) {
        return "Kitchen for feeding guards";
    } else if (roll === 12) {
        return "Watch room that allows guards to observe those who approach the dungeon";
    } else if (roll === 13) {
        return "Prison for holding captured intruders";
    } else if (roll <= 15) {
        return "Strong room or vault, for guarding the treasure hidden in the dungeon, accessible only by locked or secret door";
    } else if (roll === 16) {
        return "Torture chamber for extracting information from captured intruders";
    } else if (roll <= 20) {
        return "Trap or other trick designed to kill or capture creatures that enter the dungeon";
    }
    
    }
    if (dungeonType == null){
    //   dungeonType = document.getElementById("dungeonType").value;
        dungeonType = "general";
    }
    
    switch (dungeonType){
      case "general":
        return general()
      case "lair":
        return lair()
      case "maze":
        return maze()
      case "mine":
        return mine()
      case "planarGate":
        return planarGate()
      case "stronghold":
        return stronghold()
      case "temple":
        return temple()
      case "tomb":
        return tomb()
      case "treasureVault":
        return treasureVault()
    }
  }