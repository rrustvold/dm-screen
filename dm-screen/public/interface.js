import {ctx, squareSize} from "./config.js";

export function drawInitiativeTrack() {
  let color = 'rgba(164,240,255,0.45)';
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1080, squareSize);
  ctx.fillRect(0, 1920 - squareSize, 1080, squareSize);

  ctx.fillStyle = 'white'; // Text color
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // Draw the top
  for (let i=0; i<10; i++){
    // Save the current state before rotation
    ctx.save();
    // Move the origin to the center (to rotate around the center)
    let x = squareSize/2 + (i * squareSize);
    let y = squareSize/2;
    ctx.translate(x, y);

    // Rotate 45 degrees (in radians)
    const angle = 180 * (Math.PI / 180); // Convert degrees to radians
    ctx.rotate(angle);
    ctx.fillText(`${14 - i}`, 0, 0);
    ctx.restore();
  }

  // Draw the bottom
  for (let i=0; i<10; i++){
    // Save the current state before rotation
    ctx.save();
    // Move the origin to the center (to rotate around the center)
    let x = squareSize/2 + (i * squareSize);
    let y = 1920 - squareSize/2;
    ctx.translate(x, y);

    // Rotate 45 degrees (in radians)
    const angle = 180 * (Math.PI / 180); // Convert degrees to radians
    ctx.rotate(angle);
    ctx.fillText(`${15 + i}`, 0, 0);
    ctx.restore();
  }

  ctx.restore();
}

export function drawInitiativeTokens(opener){
    for (let i=0; i < 10; i++){
        let initiative = opener.document.getElementById(`initiative-${i}`);
        let name = opener.document.getElementById(`monster-name-${i}`);
        name = name ? name.value : null;

        let maxHp = opener.document.getElementById(`hit-point-maximum-${i}`);
        if (maxHp !== null){
          maxHp = maxHp.value;
        } else {
          maxHp = 1;
        }

        let currentHp = opener.document.getElementById(`hit-points-${i}`);
        if (currentHp !== null) {
          currentHp = currentHp.value;
        } else {
          currentHp = 1;
        }

        if (initiative !== null){
          if (initiative.value !== null && initiative.value > 0 && initiative.value < 31){
            circle(initiative.value, currentHp, maxHp, name);
          }
        } else {
          break;
        }
    }
}
function circle(num, currentHp, maxHp, name){
    let x;
    let y;
    let radius = squareSize / 2;
    // let healthBarLength = 400;
    // let shortLength = healthBarLength - radius * 0.57735; // Gives 60 degree angle
    let shortLength = squareSize;
    let healthBarLength = shortLength + radius * 0.57735;
    if (num <= 14){
    x = squareSize / 2 + (14 - num) * squareSize
    y = squareSize/2;
    } else {
    x = squareSize / 2 + (num - 15) * squareSize
    y = 1920 - squareSize / 2;
    }
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.fillStyle = "rgba(255,0,0,0.24)";
    // Draw the health bar
    ctx.beginPath();

    // Flag
    if (num < 15) {
    ctx.moveTo(x - squareSize / 2, y - squareSize / 2);
    ctx.lineTo(x - squareSize / 2, y - squareSize / 2 + shortLength);
    ctx.lineTo(x, y - squareSize / 2 + healthBarLength);
    ctx.lineTo(x + squareSize / 2, y - squareSize / 2 + shortLength);
    ctx.lineTo(x + squareSize / 2, y - squareSize / 2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    // fill the health
    ctx.save();
    ctx.clip();
    ctx.fillStyle = "#800f0f";
    ctx.fillRect(x - squareSize / 2, y - squareSize / 2, squareSize, healthBarLength * currentHp / maxHp);
    ctx.restore();

    ctx.textAlign = 'left';
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.translate(x, y - squareSize/3);
    ctx.rotate(Math.PI / 2);

    ctx.fillText(name, 0, 0);
    } else {
    ctx.moveTo(x - squareSize / 2, y + squareSize / 2);
    ctx.lineTo(x - squareSize / 2, y + squareSize / 2 - shortLength);
    ctx.lineTo(x, y + squareSize/2 - healthBarLength);
    ctx.lineTo(x + squareSize / 2, y + squareSize / 2 - shortLength);
    ctx.lineTo(x + squareSize / 2, y + squareSize / 2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    // fill the health
    ctx.save();
    ctx.clip();
    ctx.fillStyle = "#800f0f";
    ctx.fillRect(x - squareSize / 2, y + squareSize / 2, squareSize, -1*(healthBarLength * currentHp / maxHp));
    ctx.restore();

    ctx.textAlign = 'left';
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.translate(x, y+squareSize/3);
    ctx.rotate(-1* Math.PI / 2);

    ctx.fillText(name, 0, 0);
}



      ctx.restore();
    }


