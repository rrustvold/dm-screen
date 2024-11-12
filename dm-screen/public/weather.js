import {ctx} from "/config.js";

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
        ctx.lineTo(this.x + this.vx, this.y + this.vy);
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


export function drawWeather(weather) {
    switch (weather) {
        case "rain":
            return rain(50, 1);
        case "heavy-rain":
            return rain(150, 10);
        case "snow":
            return snow(100, 0);
        case "clear":
            return
        default:
            return
    }
}
