export default function Table({tableState}) {
    let iframeWindow;

    function allOff(){
        iframeWindow.hide();
    }

    function wilderness() {
        let url = document.getElementById("hex-address").value;
        if (!iframeWindow || iframeWindow.closed) {
            iframeWindow = window.open(
                `/iframe.html?url=${url}`, // This is the other HTML file we'll create.
                'iframeWindow',
                'width=800,height=600'
            );
            iframeWindow.addEventListener('load', function () {
                iframeWindow.wilderness();
            });
        } else {
            iframeWindow.wilderness();
        }
    }

    function battle() {
        if (!iframeWindow || iframeWindow.closed){
            iframeWindow = window.open(
                `/iframe.html`, // This is the other HTML file we'll create.
                'iframeWindow',
                'width=800,height=600'
            );
            iframeWindow.addEventListener('load', function () {
                iframeWindow.battle();
                iframeWindow.circle(tableState);
            });
        } else {
            iframeWindow.battle();
            iframeWindow.circle(tableState);
        }
        
        
    }

    return (
        <>
            <div class="w3-container">
                <h1>Tabletop Screen</h1>
                <input type="text" class="w3-text" id="hex-address"></input>
                <input type="button" class="w3-button" value="All off" onClick={() => allOff()}></input>
                <input type="button" class="w3-button" value="Wilderness" onClick={() => wilderness()}></input>
                <input type="button" class="w3-button" value="Battle" onClick={() => battle()}></input>
                <select class="w3-select" id="battle-style">
                    <option value="forest">Forest</option>
                    <option value="dungeon">Dungeon</option>
                </select>
                <select class="w3-select" id="zoneRows">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
                <select class="w3-select" id="zoneCols">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <select class="w3-select" id="effect">
                    <option value="difficult-terrain">Difficult Terrain</option>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="water">Water</option>
                    <option value="add-cover">Add Cover</option>
                    <option value="remove">Remove</option>
                </select>
            </div>
        </>
    )
}