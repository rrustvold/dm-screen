import {useState} from "react";

export default function Table({tableState}) {

    // const [iframeWindow, setIframeWindow] = useState();
    let iframeWindow;

    function showAll() {
        iframeWindow.showAll();

    }

    function hideAll() {
        iframeWindow.hideAll();
    }

    function refresh() {
        try{
            iframeWindow.refresh();
        }
        catch (exc){

        }
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
                `/iframe.html`,
                'iframeWindow',
                'width=800,height=600'
            );
            iframeWindow.addEventListener('load', function () {
                iframeWindow.battle();
                iframeWindow.showAll();
            });
        } else {
            iframeWindow.battle();
            iframeWindow.showAll();
        }
    }

    function clear() {
        iframeWindow.clear();
    }

    function save() {
        iframeWindow.saveState();
    }

    function load(file) {
        console.log("got a file");
        if (file){
            const reader = new FileReader();
            reader.onload = (e) => {
                const jsonData = JSON.parse(e.target.result);
                iframeWindow.load(jsonData);
                console.log(jsonData);
            };
            reader.readAsText(file);
        }
    }

    function music(style) {
        let webhook = "";
        if (style === "relaxed") {
            webhook = "http://homeassistant.local:8123/api/webhook/last-haven-relaxed-enqueue-nBAAN1gUd0jf0eb0XJruHEGQ"
        } else if (style === "tense") {
            webhook = "http://homeassistant.local:8123/api/webhook/last-haven-tense-enqueue-7AjNxmoZ8zGprEjqgEYb8xq5";
        } else if (style === "excited") {
            webhook = "http://homeassistant.local:8123/api/webhook/last-haven-excited-enqueue-CbYzKbx7elepBasMgvhPdKZ8";
        } else if (style === "fadeOut"){
            webhook = "http://homeassistant.local:8123/api/webhook/fade-out-music-Dj00BQjcVBj8qk46wyYF_KQ8";
        } else if (style === "fadeIn"){
            webhook = "http://homeassistant.local:8123/api/webhook/fade-in-music-XQX4vfmK8d30WBOTt7jj4MEL";
        }

        let response = fetch(webhook).then(() => console.log("done"));
    }

    return (
        <>
            <div className="w3-container">
                <h1>Tabletop Screen</h1>
                <input type={"button"} className={"w3-button"} value={"Relaxed"}
                       onClick={() => music("relaxed")}/>
                <input type={"button"} className={"w3-button"} value={"Tense"}
                       onClick={() => music("tense")}/>
                <input type={"button"} className={"w3-button"} value={"Excited"}
                       onClick={() => music("excited")}/>
                <input type={"button"} className={"w3-button"} value={"Fade Out"}
                       onClick={() => music("fadeOut")}/>
                <input type={"button"} className={"w3-button"} value={"Fade In"}
                       onClick={() => music("fadeIn")}/>
                <br/>
                <p>b-bridge, B-wall, z-scale, w-water, h-hide, t-tree, T-dead tree,
                    r-rock, f-fog, F-fire, d-darkness, W-web, p-poison, s-shield,
                    v-vines, i-ice, l-lava, L-light</p>
                <input type="button" className="w3-button" value="Open"
                       onClick={() => battle()}></input>
                <input type="button" className="w3-button" value="Show All"
                       onClick={() => showAll()}></input>
                <input type="button" className="w3-button" value="Hide All"
                       onClick={() => hideAll()}></input>
                <input type="button" className="w3-button" value="clear"
                       onClick={() => clear()}></input>


                <input type="button" className="w3-button" value="save"
                       onClick={() => save()}></input>
                <input type="file" accept=".json" onChange={(event) => {
                    console.log("loading");
                    load(event.target.files[0])
                }}></input>

                <select className="w3-select" id="table-type" onChange={refresh}>
                    <option value="battle">Battle</option>
                    <option value="wilderness">Wilderness</option>
                </select>
                <label>Tile Style</label>
                <select className="w3-select" id="battle-style" onChange={refresh}>
                    <option value="grassland">Grassland</option>
                    <option value="forest">Forest</option>
                    <option value="dungeon">Dungeon</option>
                    <option value="badlands">Badlands</option>
                    <option value="swamp">Swamp</option>
                    <option value="snowy-planes">Snowy Planes</option>
                    <option value="arctic">Arctic</option>
                    <option value={"dirt"}>Dirt</option>
                </select>
                <label>Background</label>
                <select className="w3-select" id="background" onChange={refresh}>
                    <option value="fall-forest">Fall Forest</option>
                    <option value="forest">Forest</option>
                    <option value="forest-river">Forest River</option>
                    <option value="dark-forest">Dark Forest</option>
                    <option value="dark-forest2">Dark Forest 2</option>
                    <option value="coast">Coast</option>
                    <option value="coast2">Coast 2</option>
                    <option value="desert">Desert</option>
                    <option value="desert-winter">Winter Desert</option>
                    <option value="hills">Hills</option>
                    <option value="mountains">Mountains</option>
                    <option value="fantasy-mountains">Fantasy Mountains</option>
                    <option value="dungeon">Dungeon</option>
                    <option value="snowy-plains">Snowy Plains</option>
                </select>
                <select className="w3-select" id="elevation-style" onChange={refresh}>
                    <option value="ground-up">Ground Up</option>
                    <option value="cliff-down">Cliff Down</option>
                </select>
                <select className={"w3-select"} id={"heading"}>
                    <option value={"north"}>North</option>
                    <option value={"north-west"}>North West</option>
                    <option value={"north-east"}>North East</option>
                    <option value={"south-east"}>South East</option>
                    <option value={"south"}>South</option>
                    <option value={"south-west"}>South West</option>
                </select>
                <label>Wind</label>
                <select className={"w3-select"} id={"table-wind"}>
                    <option value={"none"}>None</option>
                    <option value={"light"}>Light</option>
                    <option value={"heavy"}>Heavy</option>
                </select>
                <label>Rain</label>
                <select className={"w3-select"} id={"table-rain"}>
                    <option value={"none"}>None</option>
                    <option value={"light"}>Light Rain</option>
                    <option value={"heavy"}>Heavy Rain</option>
                </select>
                <label>Snow</label>
                <select className={"w3-select"} id={"table-snow"}>
                    <option value={"none"}>None</option>
                    <option value={"light"}>Light Snow</option>
                    <option value={"heavy"}>Heavy Snow</option>
                </select>
                <label>Temperature</label>
                <select className={"w3-select"} id={"table-temperature"}>
                    <option value={"normal"}>Normal</option>
                    <option value={"extreme-cold"}>Extreme Cold</option>
                    <option value={"extreme-heat"}>Extreme Heat</option>
                </select>

            </div>
        </>
    )
}