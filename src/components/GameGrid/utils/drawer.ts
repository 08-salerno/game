import { Color, getImageByColor, isColor } from './colors';
import { GridData } from './types';
import { canvasSquareSize } from './config';

export function drawSquare(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: Color | string,
): void {
  const canvasX = x * canvasSquareSize;
  const canvasY = y * canvasSquareSize;
  ctx.fillStyle = color;
  ctx.fillRect(canvasX, canvasY, canvasSquareSize, canvasSquareSize);
  if (isColor(color)) {
    ctx.drawImage(getImageByColor(color), canvasX, canvasY, canvasSquareSize, canvasSquareSize);
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
  const canvasX = x * canvasSquareSize;
  const canvasY = y * canvasSquareSize;
  ctx.fillStyle = 'red';
  ctx.lineWidth = 4;
  ctx.strokeRect(canvasX, canvasY, canvasSquareSize, canvasSquareSize);
}
