function randomObstacle(){
    let roll = Math.floor(Math.random() * 20) + 1;
    if (roll === 1) {
      return "Antilife aura with a radius of 1d10 × 10 ft.; while in the aura, living creatures can’t regain hit points";
  } else if (roll === 2) {
      return "Battering winds reduce speed by half, impose disadvantage on ranged attack rolls";
  } else if (roll === 3) {
      return "Blade barrier blocks passage";
  } else if (roll <= 8) {
      return "Cave-in";
  } else if (roll <= 12) {
      return "Chasm 1d4 × 10 ft. wide and 2d6 × 10 ft. deep, possibly connected to other levels of the dungeon";
  } else if (roll <= 14) {
      return "Flooding leaves 2d10 ft. of water in the area; create nearby upward-sloping passages, raised floors, or rising stairs to contain the water";
  } else if (roll === 15) {
      return "Lava flows through the area (50 percent chance of a stone bridge crossing it)";
  } else if (roll === 16) {
      return "Overgrown mushrooms block progress and must be hacked down (25 percent chance of a mold or fungus dungeon hazard hidden among them)";
  } else if (roll === 17) {
      return "Poisonous gas (deals 1d6 poison damage per minute of exposure)";
  } else if (roll === 18) {
      return "Reverse gravity effect causes creatures to fall toward the ceiling";
  } else if (roll === 19) {
      return "Wall of fire blocks passage";
  } else if (roll === 20) {
      return "Wall of force blocks passage";
  }
  }