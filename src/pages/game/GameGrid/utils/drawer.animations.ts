import { drawDeletedSquare, drawGrid, drawSquare } from './drawer';
import { GridData, Item, SwapDirection } from './types';
import { CANVAS_SQUARE_SIZE } from './config';
import { getRandomGrid } from './core.v2';

function drawHorizontalSwapStep(
  ctx: CanvasRenderingContext2D,
  from: Item,
  to: Item,
  offset: number,
): void {
  let leftToRightSwapStep = from.x + offset;
  const leftToRightStepBound = from.x + 1;
  if (leftToRightSwapStep > leftToRightStepBound) {
    leftToRightSwapStep = leftToRightStepBound;
  }
  drawSquare(ctx, leftToRightSwapStep, from.y, to.color);

  let rightToLeftSwapStep = to.x - offset;
  const rightToLeftSwapStepBound = to.x - 1;
  if (rightToLeftSwapStep < rightToLeftSwapStepBound) {
    rightToLeftSwapStep = rightToLeftSwapStepBound;
  }
  drawSquare(ctx, rightToLeftSwapStep, to.y, from.color);
}

export function drawVerticalSwapStep(
  ctx: CanvasRenderingContext2D,
  from: Item,
  to: Item,
  offset: number,
): void {
  let topToBottomSwapStep = from.y + offset;
  const topToBottomSwapStepBound = from.y + 1;
  if (topToBottomSwapStep > topToBottomSwapStepBound) {
    topToBottomSwapStep = topToBottomSwapStepBound;
  }
  drawSquare(ctx, from.x, topToBottomSwapStep, to.color);

  let bottomToTopSwapStep = to.y - offset;
  const bottomToTopSwapStepBound = to.y - 1;
  if (bottomToTopSwapStep < bottomToTopSwapStepBound) {
    bottomToTopSwapStep = bottomToTopSwapStepBound;
  }
  drawSquare(ctx, to.x, bottomToTopSwapStep, from.color);
}

export function drawSwapStep(
  ctx: CanvasRenderingContext2D,
  from: Item,
  to: Item,
  offset: number,
  direction: SwapDirection,
): void {
  // данный кусок закрашивает артефакты при рисовании свапа
  drawDeletedSquare(ctx, from.x, from.y);
  drawDeletedSquare(ctx, to.x, to.y);

  if (direction === 'horizontal') {
    drawHorizontalSwapStep(ctx, from, to, offset);
    return;
  }

  if (direction === 'vertical') {
    drawVerticalSwapStep(ctx, from, to, offset);
  }
}

export function drawDeleteStep(
  ctx: CanvasRenderingContext2D,
  itemsToDelete: Item[],
  offset: number,
): void {
  const size = offset * 100 > CANVAS_SQUARE_SIZE ? 0 : CANVAS_SQUARE_SIZE - offset * 100;
  const delta = (CANVAS_SQUARE_SIZE - size) / 2;
  itemsToDelete.forEach(({ x, y, color }) => {
    drawSquare(ctx, x, y, '#ffffff');
    drawSquare(ctx, x, y, color, size, delta);
  });
}

export function drawMovingDownStep(ctx: CanvasRenderingContext2D, movingDownTiles: GridData, offset: number): void {
  if (movingDownTiles) {
    movingDownTiles.forEach((column) => {
      const length = column.reduce((prev, { y }) => (y < 0 ? prev + 1 : prev), 0);
      column.forEach((tile, i) => {
        let shiftDownValue = tile.y + length * offset;

        if (shiftDownValue > i + 1) {
          shiftDownValue = i + 1;
        }
        drawSquare(ctx, tile.x, shiftDownValue, tile.color);
      });
    });
  }
}

export function drawMoveDownStep(ctx: CanvasRenderingContext2D, from: Item, to: Item, offset: number): void {
  const steps = Math.abs(from.y) + to.y;
  let topToBottomSwapStep = from.y + steps * offset;
  if (topToBottomSwapStep > to.y) {
    topToBottomSwapStep = to.y;
  }
  drawSquare(ctx, from.x, topToBottomSwapStep, from.color);
}

export function drawShuffleStep(ctx: CanvasRenderingContext2D): void {
  drawGrid(ctx, getRandomGrid());
}
