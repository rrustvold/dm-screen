export function randomTrick(){
    function trickObject(){
      let roll = Math.floor(Math.random() * 20) + 1;
      if (roll === 1) {
          return "Book";
      } else if (roll === 2) {
          return "Brain preserved in a jar";
      } else if (roll === 3) {
          return "Burning fire";
      } else if (roll === 4) {
          return "Cracked gem";
      } else if (roll === 5) {
          return "Door";
      } else if (roll === 6) {
          return "Fresco";
      } else if (roll === 7) {
          return "Furniture";
      } else if (roll === 8) {
          return "Glass sculpture";
      } else if (roll === 9) {
          return "Mushroom field";
      } else if (roll === 10) {
          return "Painting";
      } else if (roll === 11) {
          return "Plant or tree";
      } else if (roll === 12) {
          return "Pool of water";
      } else if (roll === 13) {
          return "Runes engraved on wall or floor";
      } else if (roll === 14) {
          return "Skull";
      } else if (roll === 15) {
          return "Sphere of magical energy";
      } else if (roll === 16) {
          return "Statue";
      } else if (roll === 17) {
          return "Stone obelisk";
      } else if (roll === 18) {
          return "Suit of armor";
      } else if (roll === 19) {
          return "Tapestry or rug";
      } else if (roll === 20) {
          return "Target dummy";
      }
    }
  
    function trick(){
      let roll = Math.floor(Math.random() * 100) + 1;
      if (roll <= 3) {
        return "Ages the first person to touch the object";
    } else if (roll <= 6) {
        return "The touched object animates, or it animates other objects nearby";
    } else if (roll <= 10) {
        return "Asks three skill-testing questions (if all three are answered correctly, a reward appears)";
    } else if (roll <= 13) {
        return "Bestows resistance or vulnerability";
    } else if (roll <= 16) {
        return "Changes a character’s alignment, personality, size, appearance, or sex when touched";
    } else if (roll <= 19) {
        return "Changes one substance to another, such as gold to lead or metal to brittle crystal";
    } else if (roll <= 22) {
        return "Creates a force field";
    } else if (roll <= 26) {
        return "Creates an illusion";
    } else if (roll <= 29) {
        return "Suppresses magic items for a time";
    } else if (roll <= 32) {
        return "Enlarges or reduces characters";
    } else if (roll <= 35) {
        return "Magic mouth speaks a riddle";
    } else if (roll <= 38) {
        return "Confusion (targets all creatures within 10 ft.)";
    } else if (roll <= 41) {
        return "Gives directions (true or false)";
    } else if (roll <= 44) {
        return "Grants a wish";
    } else if (roll <= 47) {
        return "Flies about to avoid being touched";
    } else if (roll <= 50) {
        return "Casts geas on the characters";
    } else if (roll <= 53) {
        return "Increases, reduces, negates, or reverses gravity";
    } else if (roll <= 56) {
        return "Induces greed";
    } else if (roll <= 59) {
        return "Contains an imprisoned creature";
    } else if (roll <= 62) {
        return "Locks or unlocks exits";
    } else if (roll <= 65) {
        return "Offers a game of chance, with the promise of a reward or valuable information";
    } else if (roll <= 68) {
        return "Helps or harms certain types of creatures";
    } else if (roll <= 71) {
        return "Casts polymorph on the characters (lasts 1 hour)";
    } else if (roll <= 75) {
        return "Presents a puzzle or riddle";
    } else if (roll <= 78) {
        return "Prevents movement";
    } else if (roll <= 81) {
        return "Releases coins, false coins, gems, false gems, a magic item, or a map";
    } else if (roll <= 84) {
        return "Releases, summons, or turns into a monster";
    } else if (roll <= 87) {
        return "Casts suggestion on the characters";
    } else if (roll <= 90) {
        return "Wails loudly when touched";
    } else if (roll <= 93) {
        return "Talks (normal speech, nonsense, poetry and rhymes, singing, spellcasting, or screaming)";
    } else if (roll <= 97) {
        return "Teleports characters to another place";
    } else if (roll <= 100) {
        return "Swaps two or more characters’ minds";
    }
    }

    return (
        <>
        <p>Trick Object: {trickObject()}</p>
        <p>{trick()}</p>
        </>
    )
  }