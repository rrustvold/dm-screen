import {canvas, ctx, r_hex, deg_60} from "./config.js";
import * as patterns from "./images.js";

export function get_fill_style(terrain, domTerrain){
  // let domterrain = opener.document.getElementById('battle-style').value;
  switch (terrain) {
    case "water":
      return patterns.waterPattern;

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
        default:
          if (domTerrain === "dungeon") {
            return patterns.dungeonFloorPattern;
          } else {
            return patterns.grassPattern;
          }

      }
  }
}

export function drawHex(x, y){
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      ctx.lineTo(x + r_hex * Math.cos(deg_60 * i), y + r_hex * Math.sin(deg_60 * i));
    }
    ctx.closePath();
    ctx.stroke();
}

export function drawHexTiles(hex_tiles, elevationStyle, domTerrain) {
  ctx.save()
  ctx.strokeStyle = "#f9c366";
  ctx.lineWidth = 6;
  let maxElevation = 0;
  hex_tiles.forEach(row => {
    row.forEach(tile => {
      if (tile.elevation > maxElevation){
        maxElevation = tile.elevation;
      }
    })
  })

  if (elevationStyle === "ground-up"){
    for (let i=hex_tiles.length; i > 0; i--){
      let row = hex_tiles[i - 1];
      for (let j=0; j < row.length; j++) {
        if (j % 2 !== 0) {
          continue;
        }
        let tile = row[j];

        tile.drawElevation();
        tile.drawGround(maxElevation, elevationStyle, domTerrain);
        // tile.drawFog();
      }
      for (let j=0; j < row.length; j++) {
        if (j % 2 === 0) {
          continue;
        }
        let tile = row[j];
        tile.drawElevation();
        tile.drawGround(maxElevation, elevationStyle, domTerrain);
        // tile.drawFog();
      }
    }
  } else {
    // cliff down
    for (let i=0; i <= maxElevation; i++) {
      hex_tiles.forEach(row => {
        row.forEach(tile => {
          if (tile.elevation >= i){
            tile.drawElevation(i > 1 ? i-1: 0, elevationStyle);
          }
        })
        row.forEach(tile => {
          if (tile.elevation === i){
            tile.drawGround(maxElevation, elevationStyle, domTerrain);
          }
        })
      })
    }
  }

  ctx.restore();
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
    this.effects = record.effects;
    this.controlPoints = record.controlPoints;
  }

  this.i = i;
  this.j = j;
  this.x = x;
  this.y = y;
  this.state = "hidden";
  this.terrain = "default";
  this.elevation = 1;
  this.elevationDirection = "up";
  this.assets = [];
  this.effects = [];

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

  this.drawGround = (maxElevation=0, elevationStyle = "ground-up", domTerrain) => {
    if (this.state === "hidden"){
      return;
    }
    ctx.save();
    ctx.shadowColor = "#152213";
    ctx.shadowBlur = 50;
    ctx.strokeStyle = "#152213";

    if (elevationStyle === "ground-up"){
      let h = elevationStep*r_hex * Math.sin(Math.PI / 3) * this.elevation;
      drawHex(this.x, this.y + h);
      ctx.fillStyle = get_fill_style(this.terrain, domTerrain);
      ctx.fill();
      if (this.elevation < maxElevation){
        ctx.fillStyle = `rgba(255,255,255,${.05 * (maxElevation - this.elevation)})`;
        ctx.fill();
      }
    } else {
      drawHex(this.x, this.y);
      ctx.fillStyle = get_fill_style(this.terrain, domTerrain);
      ctx.fill();
    }

    ctx.restore();
  }

  this.drawElevation = (elevationOffset=0, elevationStyle="ground-up") => {
    if (this.state === "hidden" || this.elevation < 0){
      return;
    }

      ctx.save();
      ctx.shadowColor = "#152213";
      ctx.shadowBlur = 50;
      ctx.strokeStyle = "#152213";
      ctx.lineCap = "round";

      let h0 = r_hex * Math.sin(Math.PI / 3);
      let h = h0 * (this.elevation - elevationOffset) * elevationStep;
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

  this.drawFog = () => {
    if (this.state === "hidden"){
      return;
    }
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = "rgba(200,200,200, 1)";
    ctx.shadowColor = "red";
    ctx.shadowBlur = 100;

    ctx.beginPath();
    ctx.strokeStyle = "rgba(255,255,255,1)";
    ctx.arc(0, 0, .9 * r_hex, 0, Math.PI, true);
    ctx.stroke();
    ctx.restore();
  }

  this.drawAssets = () => {
    if (this.state === "hidden"){
      return;
    }
    ctx.save();
    ctx.shadowBlur = 0;
    this.assets.forEach(asset => {
      ctx.save();
      let width = asset.img.width;
      let height = asset.img.height;
      ctx.translate(asset.x + width/2, asset.y + height/2);
      ctx.scale(1, -1);
      ctx.drawImage(asset.img, -width/2, -height/2);
      ctx.restore();
    })
    ctx.restore();
  }

  this.drawFire = () => {
    ctx.save();
    ctx.translate(this.x, this.y);

    ctx.restore();
  }
}