function roll(sides) {
    return Math.floor(Math.random()*sides) + 1;
}

function newDay() {
    // new weather
    let temperature;
    let wind;
    let precip;
    let _roll = roll(20);
    if (_roll <= 14){
        temperature = "Normal for the season";
    } else if (_roll <= 17){
        temperature = `${roll(4) * 10} degrees F colder than normal`;
    } else {
        temperature = `${roll(4) * 10} degrees F hotter than normal`;
    }

    _roll = roll(20);
    if (_roll <= 12) {
        wind = "None";
    } else if (roll <= 17) {
        wind = "Light";
    } else {
        wind = "Strong";
    }

    _roll = roll(20);
        if (_roll <= 12){
            precip = "None";
        } else if (_roll <= 17) {
            precip = "Light rain or light snowfall";
        } else {
            precip = "Heavy rain or snowfall";
        }
    
    document.getElementById("weather").innerHTML = `Temperature: ${temperature}, Wind: ${wind}, Precipitation: ${precip}`;
    document.getElementById("hoursMarched").value = 0;
    document.getElementById("distanceMarched").value = 0;
    document.getElementById("tilesMarched").value = 0;
    document.getElementById("forcedMarch").checked = false;
    document.getElementById("forcedMarchDC").innerText = "";
    let daysMarched = Number(document.getElementById("daysMarched").value);
    document.getElementById("daysMarched").value = daysMarched + 1;

}


function checkForcedMarch(){
    let hours = Number(document.getElementById("hoursMarched").value);
    if (hours >= 8) {
        document.getElementById("forcedMarch").checked = true;
        document.getElementById("forcedMarchDC").innerText = `DC ${10 + hours - 8} Con Save per hour`;
    }
}

function march() {
    let pace; // miles per hour
    let rate;
    let difficult = document.getElementById("difficultTerrain").checked;
    if (document.getElementById("paceSlow").checked){
        pace = 2;
        rate = 2;
    } else if (document.getElementById("paceNormal").checked) {
        pace = 3;
        rate = 2;
    } else {
        pace = 4;
        rate = 2;
    }
    if (document.getElementById("forcedMarch").checked) {
        rate = 1;
    }
    if (difficult){
        pace /= 2;
    }

    let hours = Number(document.getElementById("hoursMarched").value);
    hours += rate;
    document.getElementById("hoursMarched").value = hours;
    checkForcedMarch();

    let distance = Number(document.getElementById("distanceMarched").value);
    document.getElementById("distanceMarched").value = distance + pace*rate;

    document.getElementById("tilesMarched").value = Math.floor((distance + pace*rate) / 6);


    let encounterChance = Number(document.getElementById("encounterChance").value);
    document.getElementById("encounter").innerText = ""
    for (let i=0; i<rate; i++) {
        if (roll(100) <= encounterChance) {
            document.getElementById("encounter").innerText = "RANDOM ENCOUNTER";
            break;
        }
    }
}

function lost() {
    let hours = Number(document.getElementById("hoursMarched").value);
    document.getElementById("hoursMarched").value = hours + roll(6);
    checkForcedMarch();
}



function parseDamage(damage_str){
    damage_str = damage_str.trim().toLowerCase();
    let diceBonus = damage_str.split("+");
    let dice = diceBonus[0];
    let bonus = "0";
    if (diceBonus.length === 2){
        bonus = diceBonus[1];
    }
    dice = dice.trim();
    bonus = Number(bonus.trim());
    let numDice;
    let sides;
    [numDice, sides] = dice.split("d");
    numDice = Number(numDice);
    sides = Number(sides);

    let mean = numDice * (sides + 1) / 2 + bonus;
    let std = (numDice * (sides**2 - 1) / 12) ** .5;

    return {
        numDice: numDice,
        sides: sides,
        bonus: bonus,
        mean: mean,
        std: std,
    }
}

function hordeMath(){


    let player1 = document.getElementById("player1").value;
    let player1AC = document.getElementById("player1AC").value;
    let player2 = document.getElementById("player2").value;
    let player2AC = document.getElementById("player2AC").value;
    let player3 = document.getElementById("player3").value;
    let player3AC = document.getElementById("player3AC").value;
    let player4 = document.getElementById("player4").value;
    let player4AC = document.getElementById("player4AC").value;

    let hordeSize = document.getElementById("hordeSize").value;
    let attacksPerMonster = document.getElementById("attacksPerMonster").value;
    let hordeAttackBonus = document.getElementById("hordeAttackBonus").value;
    let hordeDamageDice = document.getElementById("hordeDamageDice").value;

    console.log(parseDamage(hordeDamageDice));
}

document.getElementById("newDay").addEventListener("click", newDay);
document.getElementById("march").addEventListener("click", march);
document.getElementById("lost").addEventListener("click", lost);

document.getElementById("hordeMathSubmit").addEventListener("click", hordeMath);
newDay();
