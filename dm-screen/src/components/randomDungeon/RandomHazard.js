export function randomHazard() {
    let roll = Math.floor(Math.random() * 20) + 1;
    if (roll <= 3) {
      return `
      Brown Mold
  
  Brown mold feeds on warmth, drawing heat from anything around it. A patch of brown mold typically covers a 10-foot square, and the temperature within 30 feet of it is always frigid.
  
  When a creature moves to within 5 feet of the mold for the first time on a turn or starts its turn there, it must make a DC 12 Constitution saving throw, taking 22 (4d10) cold damage on a failed save, or half as much damage on a successful one.
  
  Brown mold is immune to fire, and any source of fire brought within 5 feet of a patch causes it to instantly expand outward in the direction of the fire, covering a 10-foot-square area (with the source of the fire at the center of that area). A patch of brown mold exposed to an effect that deals cold damage is instantly destroyed.
      
      `;
    } else if (roll <= 8) {
        return `
        Green Slime
  
  This acidic slime devours flesh, organic material, and metal on contact. Bright green, wet, and sticky, it clings to walls, floors, and ceilings in patches.
  
  A patch of green slime covers a 5-foot square, has blindsight out to a range of 30 feet, and drops from walls and ceilings when it detects movement below it. Beyond that, it has no ability to move. A creature aware of the slime’s presence can avoid being struck by it with a successful DC 10 Dexterity saving throw. Otherwise, the slime can’t be avoided as it drops.
  
  A creature that comes into contact with green slime takes 5 (1d10) acid damage. The creature takes the damage again at the start of each of its turns until the slime is scraped off or destroyed. Against wood or metal, green slime deals 11 (2d10) acid damage each round, and any nonmagical wood or metal weapon or tool used to scrape off the slime is effectively destroyed.
  
  Sunlight, any effect that cures disease, and any effect that deals cold, fire, or radiant damage destroys a patch of green slime.
        `;
    } else if (roll <= 10) {
        return "<a href='https://www.dndbeyond.com/monsters/17013-shrieker' target='_blank'>Shrieker</a>";
    } else if (roll <= 15) {
        return `Webs
  
  Giant spiders weave thick, sticky webs across passages and at the bottom of pits to snare prey. These web-filled areas are difficult terrain. Moreover, a creature entering a webbed area for the first time on a turn or starting its turn there must succeed on a DC 12 Dexterity saving throw or become restrained by the webs. A restrained creature can use its action to try to escape, doing so with a successful DC 12 Strength (Athletics) or Dexterity (Acrobatics) check.
  
  Each 10-foot cube of giant webs has AC 10, 15 hit points, vulnerability to fire, and immunity to bludgeoning, piercing, and psychic damage.`;
    } else if (roll <= 17) {
        return "<a href='https://www.dndbeyond.com/monsters/17046-violet-fungus' target='_blank'>Violet fungus</a>";
    } else if (roll <= 20) {
        return `
        Yellow mold grows in dark places, and one patch covers a 5-foot square. If touched, the mold ejects a cloud of spores that fills a 10-foot cube originating from the mold. Any creature in the area must succeed on a DC 15 Constitution saving throw or take 11 (2d10) poison damage and become poisoned for 1 minute. While poisoned in this way, the creature takes 5 (1d10) poison damage at the start of each of its turns. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a successful save.
  
  Sunlight or any amount of fire damage instantly destroys one patch of yellow mold.`;
    }
  }