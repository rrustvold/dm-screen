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
        temperature = `${roll(4) * 10} degress F colder than normal`;
    } else {
        temperature = `${roll(4) * 10} degress F hotter than normal`;
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
}

function march() {
    let pace; // miles per hour
    let rate;
    if (document.getElementById("paceSlow").checked){
        pace = 2;
        rate = 3;
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

    let hours = Number(document.getElementById("hoursMarched").value);
    document.getElementById("hoursMarched").value = hours + rate;

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
    let hours = Number(document.getElementById("hoursMarched").innerText);
    document.getElementById("hoursMarched").innerText = hours + roll(6);
}

document.getElementById("newDay").addEventListener("click", newDay);
document.getElementById("march").addEventListener("click", march);
document.getElementById("lost").addEventListener("click", lost);
