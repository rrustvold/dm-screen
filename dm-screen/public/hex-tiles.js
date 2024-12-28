import {canvas, ctx, r_hex, deg_60} from "./config.js";
import * as patterns from "./images.js";
import {updateFire} from "./fire.js";

export function get_fill_style(terrain, domTerrain){
  // let domterrain = opener.document.getElementById('battle-style').value;
  switch (terrain) {
    case "water":
      return patterns.waterPattern;

    case "ice":
      return patterns.icePattern;
    case "lava":
      return patterns.lavaPattern;

    default:
      switch (domTerrain) {
        case "badlands":
          return patterns.badlandsPattern;
        case "swamp":
          return patterns.swampPattern;
        case "snowy-planes":
          return patterns.snowyPlanesPattern;
        case "arctic":
          return patterns.arcticPattern;
        case "forest":
          return patterns.forestPattern;
        case "dirt":
          return patterns.dirtPattern;
        default:
          if (domTerrain === "dungeon") {
            return patterns.dungeonFloorPattern;
          } else {
            return patterns.grassPattern;
          }

      }
  }
}

export function drawHex(ctx, x, y){
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      ctx.lineTo(x + r_hex * Math.cos(deg_60 * i), y + r_hex * Math.sin(deg_60 * i));
    }
    ctx.closePath();
    ctx.stroke();
}

export function drawTileEffect(hex_tiles){
  for (let i=hex_tiles.length; i > 0; i--) {
    let row = hex_tiles[i - 1];

    for (let j = 0; j < row.length; j++) {
      if (j % 2 !== 0) {
        continue;
      }
      let tile = row[j];
      tile.drawEffects();
    }
    for (let j = 0; j < row.length; j++) {
      if (j % 2 === 0) {
        continue;
      }
      let tile = row[j];
      tile.drawEffects();
    }
  }
}

export function drawHexTiles(ctx, hex_tiles, elevationStyle, domTerrain) {
  let maxElevation = 0;
  if (ctx) {
    ctx.save()
    ctx.strokeStyle = "#f9c366";
    ctx.lineWidth = 6;

    maxElevation = 0;
    hex_tiles.forEach(row => {
      row.forEach(tile => {
        if (tile.elevation > maxElevation){
          maxElevation = tile.elevation;
        }
      })
    })
  }

  if (elevationStyle === "ground-up"){
    for (let i=hex_tiles.length; i > 0; i--){
      let row = hex_tiles[i - 1];
      for (let j=0; j < row.length; j++) {
        if (j % 2 !== 0) {
          continue;
        }
        let tile = row[j];
        tile.drawElevation(ctx);
        tile.drawGround(ctx, maxElevation, elevationStyle, domTerrain);
        // tile.drawEffects();
      }
      for (let j=0; j < row.length; j++) {
        if (j % 2 === 0) {
          continue;
        }
        let tile = row[j];
        tile.drawElevation(ctx);
        tile.drawGround(ctx, maxElevation, elevationStyle, domTerrain);
        // tile.drawEffects();
      }
    }
  } else {
    // cliff down
    for (let i=0; i <= maxElevation; i++) {
      hex_tiles.forEach(row => {
        row.forEach(tile => {
          if (tile.elevation >= i){
            tile.drawElevation(ctx,i > 1 ? i-1: 0, elevationStyle);
          }
        })
        row.forEach(tile => {
          if (tile.elevation === i){
            tile.drawGround(ctx, maxElevation, elevationStyle, domTerrain);
          }
        })
      })
    }
  }


  if (ctx) {
    ctx.restore();
  }

}

export function HexTile(i, j, x , y) {

  const elevationStep = .25;

  this.recreate = (record) => {
    this.i = record.i;
    this.j = record.j;
    this.x = record.x;
    this.y = record.y;
    this.state = record.state;
    this.terrain = record.terrain;
    this.elevation = record.elevation;
    this.elevationDirection = record.elevationDirection;
    this.assets = record.assets;
    this.effects = new Set();
    this.controlPoints = record.controlPoints;
  }

  this.i = i;
  this.j = j;
  this.x = x;
  this.y = y;
  this.height = 0;
  this.state = "hidden";
  this.terrain = "default";
  this.elevation = 1;
  this.elevationDirection = "up";
  this.assets = [];
  this.effects = new Set();

  let h = r_hex * Math.sin(Math.PI / 3);
  this.controlPoints = [
          [x - .5*r_hex, y - h],
          [x + .5*r_hex, y - h],
          [x + r_hex, y],
          [x + .5*r_hex, y + h],
          [x - .5*r_hex, y + h],
          [x - r_hex, y],
          [x - .5*r_hex, y],
          [x + .5*r_hex, y],
  ];

  this.drawControlPoints = () => {
    let r = .0625 * r_hex;
    ctx.save();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(0, 0, 0, .5)";
    this.controlPoints.forEach(p => {
      ctx.beginPath();
      ctx.arc(p[0], p[1], r, 0, Math.PI * 2);
      ctx.fill();

    });
    ctx.restore();
  }

  this.drawGround = (ctx, maxElevation=0, elevationStyle = "ground-up", domTerrain) => {
    if (this.state === "hidden" || ctx === null){
      return;
    }
    ctx.save();
    ctx.shadowColor = "#152213";
    ctx.shadowBlur = 50;
    ctx.strokeStyle = "#152213";

    if (elevationStyle === "ground-up"){
      let h = elevationStep*r_hex * Math.sin(Math.PI / 3) * this.elevation;
      drawHex(ctx, this.x, this.y + h);
      ctx.fillStyle = get_fill_style(this.terrain, domTerrain);
      ctx.fill();
      if (this.elevation < maxElevation){
        ctx.fillStyle = `rgba(255,255,255,${.05 * (maxElevation - this.elevation)})`;
        ctx.fill();
      }
    } else {
      drawHex(ctx, this.x, this.y);
      ctx.fillStyle = get_fill_style(this.terrain, domTerrain);
      ctx.fill();
    }

    ctx.restore();
  }

  this.drawElevation = (ctx, elevationOffset=0, elevationStyle="ground-up") => {
    if (this.state === "hidden" || this.elevation < 0 || ctx === null){
      return;
    }

      ctx.save();
      ctx.shadowColor = "#152213";
      ctx.shadowBlur = 50;
      ctx.strokeStyle = "#152213";
      ctx.lineCap = "round";

      let h0 = r_hex * Math.sin(Math.PI / 3);
      let h = h0 * (this.elevation - elevationOffset) * elevationStep;
      this.height = h;
      let w = r_hex * Math.cos(Math.PI / 3);
      let z = r_hex * Math.sin(Math.PI / 3);

      let pt0;
      let pt1;
      let pt2;
      let pt3;
      let pt4;
      let pt5;
      let pt6;
      let pt7;

      if (elevationStyle === "ground-up"){
        pt0 = [this.x - r_hex, this.y + h];
        pt1 = [this.x - r_hex, this.y];
        pt2 = [this.x - w, this.y - z];
        pt3 = [this.x + w, this.y - z];
        pt4 = [this.x + r_hex, this.y];
        pt5 = [this.x + r_hex, this.y + h];
        pt6 = [this.x + w, this.y + h - z];
        pt7 = [this.x - w, this.y + h - z];
      }

      else if (this.elevationDirection === "up"){
        pt0 = [this.x - r_hex, this.y];
        pt1 = [this.x - r_hex, this.y - h];
        pt2 = [this.x - w, this.y -  h - h0];
        pt3 = [this.x + w, this.y - h - h0];
        pt4 = [this.x + r_hex, this.y - h];
        pt5 = [this.x + r_hex, this.y];
        pt6 = [this.x + w, this.y - h0];
        pt7 = [this.x - w, this.y - h0];
      } else if (this.elevationDirection === "down"){
        pt0 = [this.x - r_hex, this.y];
        pt1 = [this.x - r_hex, this.y + h];
        pt2 = [this.x - w, this.y + h + h0];
        pt3 = [this.x + w, this.y +  h + h0];
        pt4 = [this.x + r_hex, this.y +  h];
        pt5 = [this.x + r_hex, this.y];
        pt6 = [this.x + w, this.y + h0];
        pt7 = [this.x - w, this.y + h0];
      }

      // shift up



      ctx.fillStyle = patterns.cliffPattern;
      ctx.beginPath();

      // hilight
      ctx.fillStyle = patterns.cliffHilightPattern;
      ctx.moveTo(pt0[0], pt0[1]);
      ctx.lineTo(pt1[0], pt1[1]);
      ctx.lineTo(pt2[0], pt2[1]);
      ctx.lineTo(pt7[0], pt7[1]);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // middle
      ctx.fillStyle = patterns.cliffPattern;
      ctx.beginPath();
      ctx.moveTo(pt7[0], pt7[1]);
      ctx.lineTo(pt2[0], pt2[1]);
      ctx.lineTo(pt3[0], pt3[1]);
      ctx.lineTo(pt6[0], pt6[1]);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      //shadow
      ctx.fillStyle = patterns.cliffShadowPattern;
      ctx.beginPath();
      ctx.moveTo(pt6[0], pt6[1]);
      ctx.lineTo(pt3[0], pt3[1]);
      ctx.lineTo(pt4[0], pt4[1]);
      ctx.lineTo(pt5[0], pt5[1]);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();

  }

  this.drawAssets = (ctx) => {
    if (this.state === "hidden"){
      return;
    }
    ctx.save();
    ctx.shadowBlur = 0;
    this.assets.forEach(asset => {
      ctx.save();
      let width = asset.img.naturalWidth;
      let height = asset.img.naturalHeight;
      ctx.translate(asset.x, asset.y + this.height);
      ctx.rotate(Math.PI);
      ctx.drawImage(asset.img, -width/2, -height/2 - this.height/2);
      ctx.restore();
    })
    ctx.restore();
  }

  this.fireParticles = [];
  this.drawFire = () => {
    updateFire(this.x, this.y + this.height, this.fireParticles);
  }

  this.darknessIter = 0;
  this.drawDarkness = (color) => {
    this.darknessIter++;

    ctx.save();
    ctx.filter = "blur(20px)";
    ctx.fillStyle = color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = "black";
    ctx.beginPath();
    ctx.arc(this.x, this.y + this.height, r_hex + 10*Math.sin(this.darknessIter * 2*Math.PI / 25), 0, 2*Math.PI);
    ctx.fill();
    ctx.restore();
  }

  this.drawWeb = () => {
    ctx.drawImage(
      patterns.webImg, 
      this.x - patterns.webImg.naturalWidth/2, 
      this.y - patterns.webImg.naturalHeight/2 + this.height,
    );
  }

  this.drawVines = () => {
    ctx.drawImage(
      patterns.vinesImg,
      this.x - patterns.vinesImg.naturalWidth/2, 
      this.y - patterns.vinesImg.naturalHeight/2 + this.height,
    )
  }

  this.drawEffects = () => {
    if (this.effects.has("web")) {
      this.drawWeb();
    }
    if (this.effects.has("vines")) {
      this.drawVines();
    }
    if (this.effects.has("fire")) {
      this.drawFire();
    }
    if (this.effects.has("fog")){
      this.drawDarkness("rgba(200,200,200,.5)");
    }
    if (this.effects.has("poison")){
      this.drawDarkness("rgba(250,97,255,0.46)");
    }
    if (this.effects.has("darkness")) {
      this.drawDarkness("rgba(0,0,0,.5)");
    }
    
  }
}