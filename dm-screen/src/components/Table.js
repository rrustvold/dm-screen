export default function Table({tableState}) {
    let iframeWindow;

    function allOff(){
        iframeWindow.hide();
    }

    function showAll() {
        iframeWindow.showAll();
    }

    function hideAll() {
        iframeWindow.hideAll();
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
            });
        } else {
            iframeWindow.battle();
        }
    }

    function clear() {
        iframeWindow.clear();
    }

    return (
        <>
            <div className="w3-container">
                <h1>Tabletop Screen</h1>
                <input type="text" className="w3-text" id="hex-address"></input>
                <input type="button" class="w3-button" value="All off" onClick={() => allOff()}></input>
                <input type="button" class="w3-button" value="Open" onClick={() => battle()}></input>
                <input type="button" class="w3-button" value="Show All" onClick={() => showAll()}></input>
                <input type="button" className="w3-button" value="Hide All" onClick={() => hideAll()}></input>
                <input type="button" className="w3-button" value="clear" onClick={() => clear()}></input>

                <input type="color" id="color"></input>
                
                <select class="w3-select" id="table-type">
                    <option value="battle">Battle</option>
                    <option value="wilderness">Wilderness</option>
                </select>
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
                <input className="w3-radio" type="radio" id="hide" name="func" value="hide"></input> Hide/Show
                <input className="w3-radio" type="radio" id="elevate" name="func" value="elevate"></input> Elevate
                <input className="w3-radio" type="radio" id="tree" name="func" value="tree"></input> Tree
                <input className="w3-radio" type="radio" id="tree-stump" name="func" value="tree-stump"></input> Tree Stump
                <input className="w3-radio" type="radio" id="water" name="func" value="water"></input> Water
                <select class="w3-select" id="effect">

                    <option value="difficult-terrain">Difficult Terrain</option>
                    <option value="tree">Tree</option>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="water">Water</option>
                    <option value="hide">Hide</option>
                </select>
            </div>
        </>
    )
}