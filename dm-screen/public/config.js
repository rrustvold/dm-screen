export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');

export const bufferCanvas = document.createElement('canvas');
export const bufferCtx = bufferCanvas.getContext('2d');
bufferCtx.canvas.width = ctx.canvas.width;
bufferCtx.canvas.height = ctx.canvas.height;

export const squareSize = 108;
    // multiply by 1.78 to get r=6in
export const r_hex = 1080 / 7;
export const hex_row_size = 5; // length of row or Number of cols
export const hex_col_size = 8; // length of col or Number of rows

export const deg_60 = 2 * Math.PI / 6;


