import { hideShow } from "../utils";

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
                )
            )
        }
        setParty(party);
    }


    let rows = [];
    for (let i=0; i < partySize; i++){
        let name_id = `name_${i}`;
        let ac_id = `ac_${i}`;
        let level_id = `level_${i}`;
        // Other pc properties are not used elsewhere yet, but if they do get referenced, then change events can be added
        rows.push(
            <>
                <tr>
                    <td>
                        <input class="w3-input" type="text" id={level_id} onChange={(e) => change(e.target.value)} />
                    </td>
                    <td>
                        <input class="w3-input" type="text" id={name_id} onChange={(e) => change(e.target.value)}/>
                    </td>
                    <td>
                        <input class="w3-input" type="text" id={ac_id} onChange={(e) => change(e.target.value)} />
                    </td>
                    <td>
                        <input class="w3-input" type="text"/>
                    </td>
                    <td>
                        <input class="w3-input" type="text"/>
                    </td>
                    <td>
                        <input class="w3-input" type="text"/>
                    </td>
                    <td>
                        <input class="w3-input" type="text"/>
                    </td>
                    <td>
                        <input class="w3-input" type="text"/>
                    </td>
                    
                </tr>
            </>
        )
    }

    return (
        <div class="w3-responsive">
            <table class="w3-table w3-bordered w3-border">
                <thead>
                <tr>
                    <td>Level</td>
                    <td>Name</td>
                    <td>AC</td>
                    <td>HP</td>
                    <td>Passive Perception</td>
                    <td>Passive Insight</td>
                    <td>Passive Investigation</td>
                    <td>Initiative Bonus</td>
                    
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        </div>
    )
}

function PartySize({setPartySize}){
    return (
        <div class="w3-container">
            <p>
                <label for="partySize">Party Size </label> 
                <input type="text" id="partySize" onChange={(e) => setPartySize(e.target.value)} defaultValue="2" />
            </p>
        </div>
    )
}

class PC {
    constructor(player, name, level, ac, hp) {
        this.player = player;
        this.name = name;
        this.level = level;
        this.ac = ac;
        this.hp = hp;
    }
}

export default function Party({partySize, setPartySize, party, setParty}){
    return (
        <div class="w3-container">
            <h1>Party <button class="w3-btn w3-round w3-tiny" onClick={() => hideShow("party")}><i class="bi bi-arrow-down-up"></i></button></h1>
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