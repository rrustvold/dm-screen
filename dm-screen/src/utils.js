export default function Roll(sides, numDice=1) {
    let sum =0;
    for (let i = 0; i < numDice; i++) {
        sum += Math.floor(Math.random()*sides) + 1;
    }
    return sum
}

export function hideShow(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", " w3-hide");
    }
}

export function getRandomThingFromList(list, n=1) {
    let length = list.length;
    let stuff = [];
    for (let i=0; i < n; i++) {
        let _roll = Roll(length);
        stuff.push(list[_roll - 1])
    }
    return stuff.join("; ")
}