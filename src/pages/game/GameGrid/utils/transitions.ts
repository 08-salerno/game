import {
  Coordinates,
  DrawQueueItem,
  GridData,
  Item,
  MovingDownItemPairs,
  SwapDirection,
} from './types';
import { drawGrid, drawSquareBorder } from './drawer';
import {
  drawDeleteStep,
  drawMoveDownStep,
  drawShuffleStep,
  drawSwapStep,
} from './drawer.animations';
import {
  DELETE_ANIMATION_TIME,
  MOVE_DOWN_ANIMATION_TIME,
  SHUFFLE_ANIMATION_TIME,
  SWAP_ANIMATION_TIME,
} from './config';
import { removeSound, shuffleSound } from '../../../../components/audio';

export function drawSelectTransition(coordinates: Coordinates): DrawQueueItem {
  return {
    name: 'drawSelect',
    drawFn: (ctx): void => {
      drawSquareBorder(ctx, coordinates[0], coordinates[1]);
    },
  };
}

export function drawGridTransition(
  grid: GridData,
  transitionName: string = 'drawGrid',
): DrawQueueItem {
  return {
    name: transitionName,
    drawFn: (ctx): void => {
      drawGrid(ctx, grid);
    },
  };
}

export function drawSwapTransition(
  grid: GridData,
  from: Item,
  to: Item,
  direction: SwapDirection,
  afterFn: () => void,
): DrawQueueItem[] {
  return [
    drawGridTransition(grid, 'drawPreSwap'),
    {
      name: 'drawSwap',
      animationTime: SWAP_ANIMATION_TIME,
      drawFn: (ctx, relativeDuration): void => {
        if (relativeDuration) {
          drawSwapStep(ctx, from, to, relativeDuration, direction);
        }
      },
      afterFn,
    },
  ];
}

export function drawWrongSwapTransitions(
  grid: GridData,
  from: Item,
  to: Item,
  direction: SwapDirection,
  afterFn: () => void,
): DrawQueueItem[] {
  return [
    drawGridTransition(grid, 'drawPreWrongSwap'),
    {
      name: 'drawWrongSwap',
      animationTime: SWAP_ANIMATION_TIME / 2,
      drawFn: (ctx, relativeDuration): void => {
        if (relativeDuration) {
          drawSwapStep(ctx, from, to, relativeDuration, direction);
        }
      },
    },
    {
      name: 'drawWrongSwapBack',
      animationTime: SWAP_ANIMATION_TIME / 2,
      drawFn: (ctx, relativeDuration): void => {
        if (relativeDuration) {
          drawSwapStep(ctx, from, to, relativeDuration, direction);
        }
      },
      afterFn,
    },
  ];
}

export function drawDeleteTransition(
  matched: Item[],
): DrawQueueItem {
  return {
    name: 'drawDelete',
    animationTime: DELETE_ANIMATION_TIME,
    drawFn: (ctx, relativeDuration): void => {
      if (relativeDuration) {
        drawDeleteStep(ctx, matched, relativeDuration);
      }
    },
    afterFn: (): void => {
      removeSound();
    },
  };
}

export function drawMoveDownTransition(
  verticalSwapMovingDownPairs: MovingDownItemPairs,
): DrawQueueItem {
  return {
    name: 'drawMoveDown',
    animationTime: MOVE_DOWN_ANIMATION_TIME,
    drawFn: (ctx, relativeDuration): void => {
      if (relativeDuration) {
        verticalSwapMovingDownPairs.forEach(({ from, to }) => {
          drawMoveDownStep(ctx, from, to, relativeDuration);
        });
      }
    },
  };
}

export function drawShuffleTransition(): DrawQueueItem {
  return {
    name: 'drawShuffle',
    animationTime: SHUFFLE_ANIMATION_TIME,
    drawFn: (ctx): void => {
      shuffleSound();
      drawShuffleStep(ctx);
    },
  };
}
