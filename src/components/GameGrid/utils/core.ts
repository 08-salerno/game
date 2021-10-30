// TIR = Three in row

import React from 'react';
import {
  Combination,
  CombinationListWithCoordinatesForRemove, CombinationPosition,
  CombinationWithCoordinatesForRemove,
  Coordinates, CoordinatesForRemove,
  GridData, Item,
} from './types';
import { CANVAS_SQUARE_SIZE, GRID_SIZE } from './config';
import { Color, getRandomColor } from './colors';

export function getItemCoordsByClickCoords([x, y]: Coordinates): Coordinates {
  const res: Coordinates = [0, 0];
  if (x !== 0) {
    res[0] = Math.floor(x / CANVAS_SQUARE_SIZE);
  }
  if (y !== 0) {
    res[1] = Math.floor(y / CANVAS_SQUARE_SIZE);
  }
  return res;
}

export function getInitialGrid(): GridData {
  const gridObj: GridData = [];
  for (let column = 0; column < GRID_SIZE; column++) {
    for (let row = 0; row < GRID_SIZE; row++) {
      const cellX = column;
      const cellY = row;
      const color = getRandomColor();

      if (!Array.isArray(gridObj[column])) {
        gridObj.push([]);
      }
      gridObj[column].push({
        color,
        x: cellX,
        y: cellY,
      });
    }
  }
  return gridObj;
}

export function arrHasTIR(arr: (string | number)[]): boolean {
  let lastItem = arr[0];
  let counter = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === lastItem) {
      counter += 1;
    } else {
      lastItem = arr[i];
      counter = 1;
    }
    if (counter >= 3) {
      return true;
    }
  }

  return false;
}

export function gridHasTIR(grid: GridData): boolean {
  return (
    grid
      .map((column) => arrHasTIR(column.map((item) => item.color)))
      .some((arrHasDuplicates) => arrHasDuplicates)
        || turnDataGrid(grid)
          .map((column) => arrHasTIR(column.map((item) => item.color)))
          .some((arrHasDuplicates) => arrHasDuplicates)
  );
}

export function combinationsEquals(
  first: CombinationWithCoordinatesForRemove | Combination,
  second: CombinationWithCoordinatesForRemove | Combination,
): boolean {
  const fistCombinationsEquals = first[0][0] === second[0][0] && first[0][1] === second[0][1];

  const secondCombinationsEquals = first[1][0] === second[1][0] && first[1][1] === second[1][1];

  const swappedFistCombinationsEquals = first[0][0] === second[1][0] && first[0][1] === second[1][1];

  const swappedSecondCombinationsEquals = first[1][0] === second[0][0] && first[1][1] === second[0][1];

  return (
    (fistCombinationsEquals && secondCombinationsEquals)
        || (swappedFistCombinationsEquals && swappedSecondCombinationsEquals)
  );
}

export function findCombinations(grid: GridData): CombinationListWithCoordinatesForRemove {
  const res: CombinationListWithCoordinatesForRemove = [];

  function checkGridBorderCorrect(index: number): boolean {
    return index >= 0 && index <= GRID_SIZE - 1;
  }

  function checkItemsHaveNeededColor(currentColor: Color, items: Item[]): Item[] {
    return items.filter((item) => item.color === currentColor);
  }

  function removeDuplicates(
    combinationList: CombinationListWithCoordinatesForRemove,
  ): CombinationListWithCoordinatesForRemove {
    const listCopy = [...combinationList];
    listCopy.forEach((_, i) => {
      if (listCopy[i + 1] === undefined) return;
      if (combinationsEquals(listCopy[i], listCopy[i + 1])) {
        listCopy.splice(i, 1);
      }
    });
    return listCopy;
  }

  function findCombinationInColumnDirection(
    grid: GridData,
  ): CombinationListWithCoordinatesForRemove {
    const res: CombinationListWithCoordinatesForRemove = [];
    grid.forEach((column, columnIndex) => {
      column.forEach((item, itemIndex) => {
        const currentColor = item.color;
        const itemSplit = [-2, -1, 1, 2];
        itemSplit.forEach((split) => {
          const inBorder = checkGridBorderCorrect(itemIndex + split);
          const position: CombinationPosition = Math.abs(split) === 1 ? 'near' : 'far';
          if (inBorder) {
            if (column[itemIndex + split].color === currentColor) {
              const itemsForCheck: Item[] = [];
              let columnSplit: number;
              const rowSplit = 1;
              if (position === 'near') {
                columnSplit = split < 0 ? itemIndex - 2 : itemIndex + 2;
              } else {
                columnSplit = split < 0 ? itemIndex - 1 : itemIndex + 1;
              }
              if (
                checkGridBorderCorrect(columnIndex - rowSplit)
                                && checkGridBorderCorrect(columnSplit)
              ) {
                itemsForCheck.push(grid[columnIndex - rowSplit][columnSplit]);
              }
              if (
                checkGridBorderCorrect(columnIndex + rowSplit)
                                && checkGridBorderCorrect(columnSplit)
              ) {
                itemsForCheck.push(grid[columnIndex + rowSplit][columnSplit]);
              }
              const combinationList: CombinationListWithCoordinatesForRemove = checkItemsHaveNeededColor(currentColor, itemsForCheck).map(
                (combinedItem) => {
                  const res: [Coordinates, Coordinates, Coordinates[]] = [
                    [column[columnSplit].x, column[columnSplit].y],
                    [combinedItem.x, combinedItem.y],
                    [[column[columnSplit].x, column[columnSplit].y]],
                  ];
                  if (column[columnSplit - 1]?.color === combinedItem.color) {
                    res[2].push([column[columnSplit - 1].x, column[columnSplit - 1].y]);
                    if (column[columnSplit - 2]?.color === combinedItem.color) {
                      res[2].push([
                        column[columnSplit - 2].x,
                        column[columnSplit - 2].y,
                      ]);
                    }
                  }
                  if (column[columnSplit + 1]?.color === combinedItem.color) {
                    res[2].push([column[columnSplit + 1].x, column[columnSplit + 1].y]);
                    if (column[columnSplit + 2]?.color === combinedItem.color) {
                      res[2].push([
                        column[columnSplit + 2].x,
                        column[columnSplit + 2].y,
                      ]);
                    }
                  }

                  return res;
                },
              );

              if (position === 'near') {
                const columnSplitForFurther = split < 0 ? itemIndex - 3 : itemIndex + 3;
                if (
                  checkGridBorderCorrect(columnSplitForFurther)
                                    && column[columnSplitForFurther].color === currentColor
                ) {
                  const plusTwoSplit = split < 0 ? itemIndex - 2 : itemIndex + 2;
                  const plusOneSplit = split < 0 ? itemIndex - 1 : itemIndex + 1;
                  const itemsForRemove: CoordinatesForRemove = [
                    [column[plusTwoSplit].x, column[plusTwoSplit].y],
                    [column[itemIndex].x, column[itemIndex].y],
                    [column[plusOneSplit].x, column[plusOneSplit].y],
                  ];
                  const combinationForPush: [Coordinates, Coordinates, Coordinates[]] = [
                    [column[columnSplitForFurther].x, column[columnSplitForFurther].y],
                    [column[plusTwoSplit].x, column[plusTwoSplit].y],
                    itemsForRemove,
                  ];

                  combinationList.push(combinationForPush);
                }
              }
              res.push(...combinationList);
            }
          }
        });
      });
    });
    return res;
  }

  res.push(
    ...findCombinationInColumnDirection(grid).concat(
      findCombinationInColumnDirection(turnDataGrid(grid)),
    ),
  );
  return removeDuplicates(res);
}

export function replaceCombinations(data: GridData): GridData {
  return replaceHorizontalCombination(replaceVerticalCombination(data));
}

export function getCursorPosition(event: React.MouseEvent<Element, MouseEvent>): Coordinates {
  const canvas = event.target as HTMLCanvasElement;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return [x, y];
}

export function replaceHorizontalCombination(data: GridData): GridData {
  return turnDataGrid(replaceVerticalCombination(turnDataGrid(data)));
}

export function replaceVerticalCombination(grid: GridData): GridData {
  return grid.map((column) => {
    const duplicateCounter: Partial<Record<Color, number>> = {};
    column
      .map((item) => item.color)
      .forEach((color) => {
        const currentDuplicateCounter = duplicateCounter[color];
        if (currentDuplicateCounter !== undefined) {
          duplicateCounter[color] = currentDuplicateCounter + 1;
        } else {
          duplicateCounter[color] = 1;
        }
      });

    return column.map((item) => {
      const colorDuplication = duplicateCounter[item.color];
      const isColorDuplicated = colorDuplication && colorDuplication >= 3;
      if (isColorDuplicated) {
        return {
          ...item,
          color: getRandomColor({ except: [item.color] }),
        };
      }
      return item;
    });
  });
}

// todo [sitnik] размер матрицы сильно зависит от работы с этим методом
//  он упрощает жизнь, но мы можем реализовывать только квадратные сетки
export function turnDataGrid(data: GridData): GridData {
  const emptyGrid: GridData = data.map(() => []);
  data.forEach((column) => {
    column.forEach((item, k) => {
      emptyGrid[k].push(item);
    });
  });
  return emptyGrid;
}

export function combinationsIncludesCoords(
  combinations: CombinationListWithCoordinatesForRemove,
  coords: Combination,
): boolean {
  return combinations.some((combination) => combinationsEquals(combination, coords));
}

export function itemsCoordsEquals(first: Coordinates, second: Coordinates): boolean {
  return first[0] === second[0] && first[1] === second[1];
}

export function itemsSiblings(first: Coordinates, second: Coordinates): boolean {
  return (
    (Math.abs(first[0] - second[0]) === 1 && Math.abs(first[1] - second[1]) === 0)
        || (Math.abs(first[1] - second[1]) === 1 && Math.abs(first[0] - second[0]) === 0)
  );
}

export function coordsArrIncludesNeededCoords(
  coordArr: Coordinates[],
  coord: Coordinates,
): boolean {
  return coordArr.some(
    (coordinate) => coordinate[0] === coord[0] && coordinate[1] === coord[1],
  );
}

export type UpdatedDataGrid = {
    movingDownTiles: GridData;
    itemsForRemove: CoordinatesForRemove;
    newGridData: GridData;
}

export function getUpdatedDataGrid(
  data: GridData,
  combinations: CombinationListWithCoordinatesForRemove,
  firstClickCoord: Coordinates,
  secondClickCoord: Coordinates,
): UpdatedDataGrid {
  const currentCombination = (
        combinations as CombinationListWithCoordinatesForRemove
    ).find((combination) => combinationsEquals(combination, [firstClickCoord as Coordinates, secondClickCoord])) as CombinationWithCoordinatesForRemove;

  const itemsForRemove: CoordinatesForRemove = currentCombination[2];

  const a = data[firstClickCoord[0]][firstClickCoord[1]].color;
  const b = data[secondClickCoord[0]][secondClickCoord[1]].color;
  data[firstClickCoord[0]][firstClickCoord[1]].color = b;
  data[secondClickCoord[0]][secondClickCoord[1]].color = a;

  const movingDownTiles: GridData = [];
  const newGridData = data.map((column, i) => {
    const currentColumnItemsForRemove = itemsForRemove.filter(
      (coords) => coords[0] === column[i].x,
    );
    const beginRemovingIndex = currentColumnItemsForRemove.length === 0
      ? 0
      : Math.min(...currentColumnItemsForRemove.map((coords) => coords[1]));

    const deletedQuantity = currentColumnItemsForRemove.length;
    let columnCopy = [...column].filter(
      (item) => !coordsArrIncludesNeededCoords(currentColumnItemsForRemove, [item.x, item.y]),
    );
    movingDownTiles[i] = [];
    columnCopy = columnCopy.map((item, j) => {
      if (!deletedQuantity) return item;
      if (j < beginRemovingIndex) {
        movingDownTiles[i].push(item);
        return {
          ...item,
          x: item.x,
          y: item.y + deletedQuantity,
        };
      }
      return item;
    });
    for (let k = columnCopy.length; k !== GRID_SIZE; k++) {
      const newItem = {
        x: column[i].x,
        y: GRID_SIZE - k - 1,
        color: getRandomColor(),
      };
      movingDownTiles[i].unshift({ ...newItem, y: newItem.y - deletedQuantity });
      columnCopy.unshift(newItem);
    }

    return columnCopy;
  });
    // todo [sitnik] эта проверка и анимация свапа должны выполнятся друг за другом пока gridHasTIR == true
    // if (gridHasTIR(newGridData)) {
    //   //TODO нету свапа и нужна нормальная рекурсия с подсчетом очков возможно
    //   // Рекурсивный вызов, чтобы при взрыве НЕ появилось новых TIR,
    //   // Можно переписать на появление и взрыв новых с использованием findCombination и подсчитать очки
    //   //Бывает ошибка с слишком большим кол-во вызовов
    //   newGridData = getUpdatedDataGrid(data, combinations, firstClickCoord, secondClickCoord).newGridData;
    // }
  return { movingDownTiles, itemsForRemove, newGridData };
}
