function PartyInput({partySize}) {
    let rows = [];
    for (let i=0; i < partySize; i++){
        rows.push(
            <>
                <tr>
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
                        <input type="text"/>
                    </td>
                    <td>
                        <input type="text"/>
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
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        </div>
    )
}

function PartySize(){
    return (
        <input type="text" />
    )
}

export default function Party({characterNames, characterACs}){

    return (
        <>
        <PartySize></PartySize>
        <PartyInput partySize={4}></PartyInput>
        </>
            )
}