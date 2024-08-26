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
                        <input type="text" id={name_id} onChange={(e) => change(e.target.value)}/>
                    </td>
                    <td>
                        <input type="text" id={ac_id} onChange={(e) => change(e.target.value)} />
                    </td>
                    <td>
                        <input type="text"/>
                    </td>
                    <td>
                        <input type="text"/>
                    </td>
                    <td>
                        <input type="text"/>
                    </td>
                    <td>
                        <input type="text"/>
                    </td>
                    <td>
                        <input type="text"/>
                    </td>
                    <td>
                        <input type="text" id={level_id} onChange={(e) => change(e.target.value)} />
                    </td>
                </tr>
            </>
        )
    }

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <td>Name</td>
                    <td>AC</td>
                    <td>HP</td>
                    <td>Passive Perception</td>
                    <td>Passive Insight</td>
                    <td>Passive Investigation</td>
                    <td>Initiative Bonus</td>
                    <td>Level</td>
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
        <input type="text" onChange={(e) => setPartySize(e.target.value)} defaultValue="2" />
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
        <>
        <PartySize setPartySize={setPartySize}></PartySize>
        <PartyInput partySize={partySize} party={party} setParty={setParty}></PartyInput>
        </>
    )
}