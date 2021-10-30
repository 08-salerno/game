import { drawSquare } from './drawer';
import { CoordinatesForRemove, GridData, Item } from './types';

export type SwapDirection = 'horizontal' | 'vertical';

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

function drawVerticalSwapStep(
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
  if (direction === 'horizontal') {
    drawHorizontalSwapStep(ctx, from, to, offset);
    return;
  }

  if (direction === 'vertical') {
    drawVerticalSwapStep(ctx, from, to, offset);
  }
}

export function drawTilesAsDeleted(
  ctx: CanvasRenderingContext2D,
  deletedTiles: CoordinatesForRemove,
): void {
  const maskColor = `rgba(255, 255, 255, .9)`;

  deletedTiles.forEach(([x, y]) => {
    drawSquare(ctx, x, y, maskColor);
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
