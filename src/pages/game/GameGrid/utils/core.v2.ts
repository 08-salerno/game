import { cloneDeep, isEqual } from 'lodash';
import {
  Coordinates,
  GridData,
  GridDataWithEmpty,
  Item,
  MovingDownItemPairs,
  SwapInfo,
} from './types';
import { GRID_SIZE } from './config';
import { Color, getRandomColor } from './colors';

export function firstMatchOrFalse(grid: GridData): Item[] | false {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      // проверка по горизонтали
      if (j <= GRID_SIZE - 3) {
        let count = 1;
        const arr: Item[] = [grid[i][j]];
        // здесь GRID_SIZE равен кол-ву колонок
        while (j + count < GRID_SIZE && grid[i][j].color === grid[i][j + count].color) {
          arr.push(grid[i][j + count]);
          count++;
        }
        if (count >= 3) {
          return arr;
        }
      }
      // по вертикали
      if (i <= GRID_SIZE - 3) {
        let count = 1;
        const arr: Item[] = [grid[i][j]];
        // здесь GRID_SIZE равен кол-ву рядов
        while (i + count < GRID_SIZE && grid[i][j].color === grid[i + count][j].color) {
          arr.push(grid[i + count][j]);
          count++;
        }
        if (count >= 3) {
          return arr;
        }
      }
    }
  }

  return false;
}

export function moveDown(grid: GridDataWithEmpty): MovingDownItemPairs {
  let shouldContinueMovingDown = true;

  const verticalSwapMovingDownPairs: { from: Item; to: Item }[] = [];

  while (shouldContinueMovingDown) {
    shouldContinueMovingDown = false;
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === null) {
          shouldContinueMovingDown = true;

          if (j > 0) {
            // сохранение для анимации
            const movingDownTileFrom = grid[i][j - 1]!;
            const movingDownTileTo = { ...movingDownTileFrom, y: j };
            const repeatIndex = verticalSwapMovingDownPairs.findIndex(({ to }) => isEqual(to, movingDownTileFrom));
            if (repeatIndex === -1) {
              verticalSwapMovingDownPairs.push({
                from: movingDownTileFrom,
                to: movingDownTileTo,
              });
            } else {
              verticalSwapMovingDownPairs[repeatIndex].to = movingDownTileTo;
            }

            // фактический сдвиг вниз
            grid[i][j] = movingDownTileTo;
            grid[i][j - 1] = null;
          } else {
            const newTile = { x: i, y: j, color: getRandomColor() };
            // сохранение для анимации с поднятием на одну клетку
            const tileBehindZeroInSameColumnCount = verticalSwapMovingDownPairs.filter(
              ({ from }) => from.x === newTile.x && from.y < 0,
            ).length + 1;
            verticalSwapMovingDownPairs.push({
              from: { ...newTile, y: newTile.y - tileBehindZeroInSameColumnCount },
              to: newTile,
            });

            // фактическое добавление в первый ряд
            grid[i][j] = newTile;
          }
        }
      }
    }
  }

  return verticalSwapMovingDownPairs;
}

export function deleteMatched(grid: GridData, matched: Item[]): void {
  matched.forEach((item) => {
    (<GridDataWithEmpty>grid)[item.x][item.y] = null;
  });
}

export function getItemByCoordinates(
  grid: GridData,
  coordinates: Coordinates,
): Item | undefined {
  return grid[coordinates[0]]?.[coordinates[1]];
}

export function getSwapInfo(
  grid: GridData,
  firstClickCoord: Coordinates,
  secondClickCoord: Coordinates,
): SwapInfo {
  const firstItem = getItemByCoordinates(grid, firstClickCoord)!;
  const secondItem = getItemByCoordinates(grid, secondClickCoord)!;
  const direction = firstClickCoord[0] === secondClickCoord[0] ? 'vertical' : 'horizontal';

  if (direction === 'vertical') {
    return {
      direction,
      from: firstClickCoord[1] < secondClickCoord[1] ? firstItem : secondItem,
      to: firstClickCoord[1] < secondClickCoord[1] ? secondItem : firstItem,
    };
  }
  return {
    direction,
    from: firstClickCoord[0] < secondClickCoord[0] ? firstItem : secondItem,
    to: firstClickCoord[0] < secondClickCoord[0] ? secondItem : firstItem,
  };
}

export function generateGridWithOutTIR(): GridData {
  const col: Item[][] = [];
  for (let j = 0; j < GRID_SIZE; j++) {
    const row: Item[] = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      let newTileMakeMatch = true;
      let newTileColor: Color;
      while (newTileMakeMatch) {
        newTileColor = getRandomColor();
        const newTileColorRepeatsHorizontally = i >= 2
          ? newTileColor === row[i - 1].color && newTileColor === row[i - 2].color
          : false;
        const newTileColorRepeatsVertically = j >= 2
          ? newTileColor === col[j - 1][i].color && newTileColor === col[j - 2][i].color
          : false;
        newTileMakeMatch = newTileColorRepeatsHorizontally || newTileColorRepeatsVertically;
      }
      row.push({ x: j, y: i, color: newTileColor! });
    }
    col.push(row);
  }
  return col;
}

export function cloneGrid(grid: GridData): GridData {
  return cloneDeep(grid);
}

export function getRandomGrid(): GridData {
  const col: Item[][] = [];
  for (let j = 0; j < GRID_SIZE; j++) {
    const row: Item[] = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      row.push({ x: j, y: i, color: getRandomColor() });
    }
    col.push(row);
  }
  return col;
}
