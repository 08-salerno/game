import { Color, getImageByColor, isColor } from './colors';
import { GridData, GridDataWithEmpty } from './types';
import { CANVAS_SQUARE_SIZE } from './config';

export function drawSquare(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: Color | string,
  size = CANVAS_SQUARE_SIZE,
  delta?: number,
): void {
  const canvasX = x * CANVAS_SQUARE_SIZE + (delta || 0);
  const canvasY = y * CANVAS_SQUARE_SIZE + (delta || 0);
  ctx.fillStyle = color;
  ctx.fillRect(canvasX, canvasY, size, size);
  if (isColor(color)) {
    ctx.drawImage(getImageByColor(color), canvasX, canvasY, size, size);
  }
}

export function drawGrid(ctx: CanvasRenderingContext2D, data: GridData | GridDataWithEmpty): void {
  data.forEach((column, x) => {
    column.forEach((_, y) => {
      const tile = data[x][y];
      if (tile) {
        drawSquare(ctx, tile.x, tile.y, tile.color);
      } else {
        drawDeletedSquare(ctx, x, y);
      }
    });
  });
}

export function drawDeletedSquare(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  drawSquare(ctx, x, y, '#ffffff');
}

export function drawSquareBorder(ctx: CanvasRenderingContext2D,
  x: number,
  y: number): void {
  const borderWidth = 4;
  const halfBorderWidth = borderWidth / 2;
  const canvasX = x * CANVAS_SQUARE_SIZE + halfBorderWidth;
  const canvasY = y * CANVAS_SQUARE_SIZE + halfBorderWidth;
  const size = CANVAS_SQUARE_SIZE - borderWidth;
  ctx.strokeStyle = '#ff0000';
  ctx.lineWidth = borderWidth;
  ctx.strokeRect(canvasX, canvasY, size, size);
}
