import { Color, getImageByColor, isColor } from './colors';
import { GridData } from './types';
import { CANVAS_SQUARE_SIZE } from './config';

export function drawSquare(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: Color | string,
): void {
  const canvasX = x * CANVAS_SQUARE_SIZE;
  const canvasY = y * CANVAS_SQUARE_SIZE;
  ctx.fillStyle = color;
  ctx.fillRect(canvasX, canvasY, CANVAS_SQUARE_SIZE, CANVAS_SQUARE_SIZE);
  if (isColor(color)) {
    ctx.drawImage(getImageByColor(color), canvasX, canvasY, CANVAS_SQUARE_SIZE, CANVAS_SQUARE_SIZE);
  }
}

export function drawGrid(ctx: CanvasRenderingContext2D, data: GridData): void {
  data.forEach((column) => {
    column.forEach((item) => {
      drawSquare(ctx, item.x, item.y, item.color);
    });
  });
}

// todo [sitnik] для вызова функции нужен контекст канваса, которого нет при обработке клика в игре
export function drawSquareBorder(ctx: CanvasRenderingContext2D,
  x: number,
  y: number): void {
  const canvasX = x * CANVAS_SQUARE_SIZE;
  const canvasY = y * CANVAS_SQUARE_SIZE;
  ctx.fillStyle = 'red';
  ctx.lineWidth = 4;
  ctx.strokeRect(canvasX, canvasY, CANVAS_SQUARE_SIZE, CANVAS_SQUARE_SIZE);
}
