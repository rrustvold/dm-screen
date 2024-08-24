import Roll from '../utils'
import {useState} from "react";

export default function RandomEncounter() {
    let levels = [1];

    const [numMonsters, setNumMonsters] = useState(1);
    const [monster, setMonster] = useState(
        {
            name: "",
            xp: 0,
            size: "",
            type: "",
            alignment: "",
            armor_class: [0],
            hit_points: 0,
            speed: {walk: 0},
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
            actions: []
        }
    );

    let actions = [];
    monster.actions.forEach(action => actions.push(
        <>
        <p><b>{action.name}</b></p>
        <p>{action.desc}</p>
        <hr/>
        </>
    ))

    return (
        <div>
            <h1>Random Encounter</h1>
            <input type="button" value="Generate" onClick={() => generateMonster(setMonster)}/>
            <h3>{numMonsters} {monster.name} {monster.xp * numMonsters} XP</h3>
            <p><b>{monster.size} {monster.type} {monster.alignment}</b></p>
            <p>AC: {monster.armor_class[0].value}, HP: {monster.hit_points}, Speed:
                {monster.speed.walk}</p>
            <p>Str: {monster.strength}, Dex: {monster.dexterity}, Con:
                {monster.constitution}, Int: {monster.intelligence}, Wis:
                {monster.wisdom}, Cha: {monster.charisma}</p>
            <p><b>Actions:</b></p>
            {actions}
        </div>
    )
}

async function generateMonster(setMonster, levels=[1,1,1,1]) {
    // CR 1 = 200 xp
    const encounter_difficulty = [
        //easy, medium, difficult, deadly
        [25, 50, 75, 100],
        [50, 100, 150, 200],
        [75, 150, 225, 400],
        [125, 250, 375, 500],
        [250, 500, 750, 1100],
        [300, 600, 900, 1400],
        [350, 750, 1100, 1700],
        [450, 900, 1400, 2100],
        [550, 1100, 1600, 2400],
        [600, 1200, 1900, 2800]
    ];
    let roll = Roll(100);
    let difficulty;
    if (roll < 60) {
        difficulty = 0;
      } else if (roll < 90) {
        difficulty = 1;
      } else if (roll < 97) {
        difficulty = 2;
      } else {
        difficulty = 3;
      }
      let xp =0;
      levels.forEach((level) => xp += encounter_difficulty[level][difficulty]);

      let num_monsters = Math.ceil(Math.random() * 2);
      let multiplier = 1;
      if (num_monsters === 2){
        multiplier = 1.5;
      }
      let monster_xp = xp / num_monsters;

      let monster_cr = monster_xp / 200;
      if (monster_cr < 0.50){
        monster_cr = .25;
      } else if (monster_cr < 1) {
        monster_cr = .5;
      } else {
        monster_cr = Math.floor(monster_cr);
  }

  let monster_key;
  await fetch(`https://www.dnd5eapi.co/api/monsters/?challenge_rating=${monster_cr}`)
    .then(response => response.json())
    .then(data => {
      let num_results = data["count"];
      let random_monster = Math.floor(Math.random() * num_results);
      monster_key = data["results"][random_monster]["index"];
    })
    .catch(error => console.error(error));


  await fetch(`https://www.dnd5eapi.co/api/monsters/${monster_key}`)
    .then(response => response.json())
      .then(monster => {

          setMonster(monster)




        let card = (
            `
              <div>
                  <h3>${num_monsters} ${monster.name} ${monster.xp * num_monsters} XP</h3>
                  <p><b>${monster.size} ${monster.type} ${monster.alignment}</b></p>
                  <p>AC: ${monster.armor_class[0].value}, HP: ${monster.hit_points}, Speed: ${monster.speed.walk}</p>
                  <p>Str: ${monster.strength}, Dex: ${monster.dexterity}, Con: ${monster.constitution}, Int: ${monster.intelligence}, Wis: ${monster.wisdom}, Cha: ${monster.charisma}</p>
                  <p><b>Actions:</b></p>
            `
        );

        monster.actions.forEach(action => {
          card += (`
              <p><b>${action.name}</b></p>
              <p>${action.desc}</p>
              <hr>
              <form>
              <div class="form-group">
              `);

        });
        for (let i=0; i < num_monsters; i++){
          card += (`

              <label for="quantity">Monster ${i+1} HP</label>
              <input class="form-control" type="number" id="quantity" name="quantity" value="${monster.hit_points}">
            
          `)
        }
        card += (`
            </div>
            </form>
            
        `);

        card += `</div>`;

        return card
      })
    .catch(error => console.error(error));
}
