import {ctx, squareSize} from "/config.js";

function Drop(vx){
    this.x = ctx.canvas.width * Math.random();
    this.y = ctx.canvas.height * Math.random();
    this.vx = vx
    this.vy = 100;

    this.strokeStyle = `rgba(200,200,200,${Math.random() * 0.9}`;


    this.draw = () => {
        ctx.strokeStyle = this.strokeStyle;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.vx, this.y - this.vy);
        ctx.stroke();
        this.x += this.vx;
        this.y -= this.vy;
    }
}

function Flake(vx){
    this.x = ctx.canvas.width * Math.random();
    this.y = ctx.canvas.height * Math.random();
    this.vx = vx
    this.vy = 5;
    this.r = Math.random() * 10;

    this.fillStyle = `rgba(200,200,200,${Math.random() * 0.9}`;


    this.draw = () => {
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.fill();
        this.x += this.vx;
        this.vx += (Math.random() - .5)
        this.y -= this.vy;
    }
}

let drops = [];
let flakes = [];

function rain(numDrops, speed) {

    while (drops.length < numDrops){
        drops.push(new Drop(speed));
    }
    if (drops.length > numDrops) {
        drops.splice(0, numDrops);
    }

    ctx.save();
    ctx.strokeWidth = 1;
    ctx.lineWidth = 1;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "black";
    drops.forEach(drop => drop.draw());
    ctx.restore();

    drops.forEach((drop, i) => {
        if (drop.x > ctx.canvas.width || drop.y < 0) {
            drops[i] = new Drop(speed);
        }
    });
}

function snow(numFlakes, speed) {

    while (flakes.length < numFlakes){
        flakes.push(new Flake(speed));
    }
    if (flakes.length > numFlakes) {
        flakes.splice(0, numFlakes);
    }

    ctx.save();
    ctx.strokeWidth = 1;
    ctx.lineWidth = 1;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "black";
    flakes.forEach(flake => flake.draw());
    ctx.restore();

    flakes.forEach((flake, i) => {
        if (flake.x > ctx.canvas.width || flake.x < 0 || flake.y < 0) {
            flakes[i] = new Flake(speed);
        }
    });
}


export function drawWeather(wind, _rain, _snow, temperature) {
    if (wind === "heavy") {
        if (_rain === "light") {
            rain(50, 20);
        } else if (_rain === "heavy") {
            rain(150, 10);
        }

        if (_snow === "light") {
            snow(100, 20);
        } else if (_snow === "heavy"){
            snow(300, 20);
        }
    } else if (wind === "light") {
        if (_rain === "light") {
            rain(50, 10);
        } else if (_rain === "heavy") {
            rain(150, 10);
        }

        if (_snow === "light") {
            snow(100, 10);
        } else if (_snow === "heavy"){
            snow(300, 10);
        }
    } else {
        if (_rain === "light") {
            rain(50, 0);
        } else if (_rain === "heavy") {
            rain(150, 0);
        }

        if (_snow === "light") {
            snow(100, 0);
        } else if (_snow === "heavy"){
            snow(300, 0);
        }
    }
}

export function drawWeatherReminder(wind, rain, snow, temperature){
    if (
        wind === 'heavy' ||
        rain === 'heavy' ||
        snow === 'heavy' ||
        temperature !== 'normal'
    ) {
        ctx.save();
        ctx.translate(1080/2, 1920/2);
        ctx.rotate(Math.PI);
        ctx.translate(-1080/2, -1920/2);
        ctx.fillStyle = 'rgba(164,240,255,0.45)';
        ctx.fillRect(0, 200, 1080 - 100, 600);

        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        let cursor = 250;
        let lineSpace = 50;
        let left = 50;
        let indent = 50;
        if (temperature === 'extreme-cold'){
            ctx.fillText('Extreme Cold', left, cursor);
            cursor += lineSpace*2;
        } else if (temperature === 'extreme-heat'){
            ctx.fillText('Extreme Heat', left, cursor);
            cursor += lineSpace*2;
        }
        if (rain === 'heavy' || snow === "heavy"){
            ctx.fillText("Heavy Precipitation", left, cursor);
            cursor += lineSpace
            ctx.fillText("Vision is lightly obscured.", left + indent, cursor);
            cursor += lineSpace
            ctx.fillText("Disadvantage on Wisdom (perception) checks.", left + indent, cursor);

            cursor += lineSpace*2;
        }

        if (wind === 'heavy') {
            ctx.fillText("Heavy Wind", left, cursor);
            cursor += lineSpace
            ctx.fillText("Disadvantage on ranged attack rolls", left + indent, cursor);
            cursor += lineSpace*2;
        }
        ctx.restore();
    }
}

export function drawWeatherSidebar(wind, rain, snow) {
    if (
        wind === 'heavy' ||
        rain === 'heavy' ||
        snow === 'heavy'
    ) {
        ctx.save();
        ctx.translate(1080/2, 1920/2);
        ctx.rotate(Math.PI);
        ctx.translate(-1080/2, -1920/2);
        ctx.font = "40px Material Symbols Outlined";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (rain === 'heavy' || snow === 'heavy') {
            ctx.fillStyle = 'rgba(164,240,255,0.45)';
            ctx.fillRect(0, 325, squareSize, squareSize);
            ctx.fillStyle = "red";
            ctx.fillText("rainy", squareSize/2, 325 + squareSize/2);
        }
        if (wind === 'heavy') {
            ctx.fillStyle = 'rgba(164,240,255,0.45)';
            ctx.fillRect(0, 325 + squareSize, squareSize, squareSize);
            ctx.fillStyle = "red";
            ctx.fillText("air", squareSize/2, 325 + squareSize + squareSize/2);
        }

        ctx.restore();
    }
}
