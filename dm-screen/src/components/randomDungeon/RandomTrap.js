export function randomTrap(){
    function trigger(){
      let roll = Math.floor(Math.random() * 6) + 1;
      if (roll === 1) {
        return "Stepped on (floor, stairs)";
    } else if (roll === 2) {
        return "Moved through (doorway, hallway)";
    } else if (roll === 3) {
        return "Touched (doorknob, statue)";
    } else if (roll === 4) {
        return "Opened (door, treasure chest)";
    } else if (roll === 5) {
        return "Looked at (mural, arcane symbol)";
    } else if (roll === 6) {
        return "Moved (cart, stone block)";
    }
    }
    function damage(){
      let roll = Math.floor(Math.random() * 6) + 1;
      if (roll <= 2) {
        return "Setback 1d10";
    } else if (roll <= 5) {
        return "Dangerous 2d10";
    } else if (roll === 6) {
        return "Deadly 4d10";
    }
    }
    function effects(){
      let roll = Math.floor(Math.random() * 100) + 1;
      if (roll <= 4) {
        return "Magic missiles shoot from a statue or object";
    } else if (roll <= 7) {
        return "Collapsing staircase creates a ramp that deposits characters into a pit at its lower end";
    } else if (roll <= 10) {
        return "Ceiling block falls, or entire ceiling collapses";
    } else if (roll <= 12) {
        return "Ceiling lowers slowly in locked room";
    } else if (roll <= 14) {
        return "Chute opens in floor";
    } else if (roll <= 16) {
        return "Clanging noise attracts nearby monsters";
    } else if (roll <= 19) {
        return "Touching an object triggers a disintegrate spell";
    } else if (roll <= 23) {
        return "Door or other object is coated with contact poison";
    } else if (roll <= 27) {
        return "Fire shoots out from wall, floor, or object";
    } else if (roll <= 30) {
        return "Touching an object triggers a flesh to stone spell";
    } else if (roll <= 33) {
        return "Floor collapses or is an illusion";
    } else if (roll <= 36) {
        return "Vent releases gas: blinding, acidic, obscuring, paralyzing, poisonous, or sleep-inducing";
    } else if (roll <= 39) {
        return "Floor tiles are electrified";
    } else if (roll <= 43) {
        return "Glyph of warding";
    } else if (roll <= 46) {
        return "Huge wheeled statue rolls down corridor";
    } else if (roll <= 49) {
        return "Lightning bolt shoots from wall or object";
    } else if (roll <= 52) {
        return "Locked room floods with water or acid";
    } else if (roll <= 56) {
        return "Darts shoot out of an opened chest";
    } else if (roll <= 59) {
        return "A weapon, suit of armor, or rug animates and attacks when touched (see “Animated Objects” in the Monster Manual)";
    } else if (roll <= 62) {
        return "Pendulum, either bladed or weighted as a maul, swings across the room or hall";
    } else if (roll <= 67) {
        return "Hidden pit opens beneath characters (25 percent chance that a black pudding or gelatinous cube fills the bottom of the pit)";
    } else if (roll <= 70) {
        return "Hidden pit floods with acid or fire";
    } else if (roll <= 73) {
        return "Locking pit floods with water";
    } else if (roll <= 77) {
        return "Scything blade emerges from wall or object";
    } else if (roll <= 81) {
        return "Spears (possibly poisoned) spring out";
    } else if (roll <= 84) {
        return "Brittle stairs collapse over spikes";
    } else if (roll <= 88) {
        return "Thunderwave knocks characters into a pit or spikes";
    } else if (roll <= 91) {
        return "Steel or stone jaws restrain a character";
    } else if (roll <= 94) {
        return "Stone block smashes across hallway";
    } else if (roll <= 97) {
        return "Symbol";
    } else if (roll <= 100) {
        return "Walls slide together";
    }
    }
  
    return (
        <div class="w3-container w3-border">
        <p>Trigger: {trigger()}</p>
        <p>Damage: {damage()}</p>
        <p>Effects:</p>
        <p>{effects()}</p>
        </div>
    )

  }