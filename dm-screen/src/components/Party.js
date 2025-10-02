
import React from 'react';

function PartyInput({partySize, party, setParty}) {

    function change() {
        let party = []
        for (let i=0; i < partySize; i++){
            party.push(
                new PC(
                    document.getElementById(`name_${i}`).value,
                    document.getElementById(`name_${i}`).value,
                    document.getElementById(`level_${i}`).value,
                    document.getElementById(`ac_${i}`).value,
                    document.getElementById(`hp_${i}`).value,
                    document.getElementById(`initiative_${i}`).value,
                    document.getElementById(`avg_damage_${i}`).value,
                    document.getElementById(`attack_bonus_${i}`).value
                )
            )
        }
        setParty(party);
    }

    // Update party when party size changes
    React.useEffect(() => {
        change();
    }, [partySize]);


    let rows = [];
    for (let i=0; i < partySize; i++){
        let name_id = `name_${i}`;
        let ac_id = `ac_${i}`;
        let level_id = `level_${i}`;
        let hp_id = `hp_${i}`;
        let initiative_id = `initiative_${i}`;
        let avg_damage_id = `avg_damage_${i}`;
        let attack_bonus_id = `attack_bonus_${i}`;
        // Other pc properties are not used elsewhere yet, but if they do get referenced, then change events can be added
        rows.push(
            <div class="w3-quarter w3-margin-bottom">
            <div class="w3-card-4">
                <label>Level</label>
                <input className="w3-input" type="number" id={level_id}
                       onChange={(e) => change(e.target.value)} defaultValue={3}/>
                <label>Name</label>
                <input className="w3-input" type="text" id={name_id}
                       onChange={(e) => change(e.target.value)} defaultValue={`Player ${i + 1}`}/>
                <label>AC</label>
                <input className="w3-input" type="number" id={ac_id}
                       onChange={(e) => change(e.target.value)} defaultValue={15}/>
                <label>HP</label>
                <input className="w3-input" type="number" id={hp_id}
                       onChange={(e) => change(e.target.value)} defaultValue={30}/>
                <label>Initiative</label>
                <input className="w3-input" type="number" id={initiative_id}
                       onChange={(e) => change(e.target.value)} defaultValue={2}/>
                <label>Average Damage</label>
                <input className="w3-input" type="number" id={avg_damage_id}
                       onChange={(e) => change(e.target.value)} defaultValue={10}/>
                <label>Attack Bonus</label>
                <input className="w3-input" type="number" id={attack_bonus_id}
                       onChange={(e) => change(e.target.value)} defaultValue={5}/>
            </div>
            </div>
        )
    }
    return <div class="w3-row-padding">{rows}</div>
}

function PartySize({setPartySize}){
    return (
        <div class="w3-container">
            <p>
                <label for="partySize">Party Size </label> 
                <input type="number" id="partySize" onChange={(e) => setPartySize(e.target.value)} defaultValue="2" />
            </p>
        </div>
    )
}

export class PC {
    constructor(player, name, level, ac, hp, initiative, avgDamage, attackBonus) {
        this.player = player;
        this.name = name;
        this.level = level;
        this.ac = ac;
        this.hp = hp;
        this.initiative = initiative;
        this.avgDamage = avgDamage;
        this.attackBonus = attackBonus;
    }
}

export function Party({partySize, setPartySize, party, setParty}){
    return (
        <div class="w3-container">
            <h1>Party</h1>
            <div class="w3-container w3-show" id="party">
                <PartySize setPartySize={setPartySize}></PartySize>
                {/* <div class="w3-container">
                    <p>
                        Languages Known: <input type="text" class="w3-input"></input>
                    </p>
                </div> */}
                
                <PartyInput partySize={partySize} party={party} setParty={setParty}></PartyInput>
            </div>
        </div>
    )
}