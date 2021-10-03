import React, {
  useCallback,
  useState,
} from 'react';
import Canvas from '../Canvas/Canvas';

// TIR = Three in row

type Color = 'red' | 'green' | 'blue' | 'yellow' | 'white' | 'pink' | 'purple';
type Coordinates = [number, number]
type Item = { color: Color, x: number, y: number };
type Combination = [Coordinates, Coordinates]
type ItemsForRemove = Coordinates[]
type CombinationWithItemsForRemove = [Coordinates, Coordinates, ItemsForRemove]
type CombinationListWithItemsForRemove = [Coordinates, Coordinates, Coordinates[]][];

const colors: Color[] = ['red', 'green', 'blue', 'yellow', 'white', 'pink', 'purple'];

type GridData = Item[][];

const squareColors = ['rgba(56, 66, 75, 1)', 'rgba(69, 79, 87, 1)'];

const gridSize = 9;

const squareSize = 100;

function drawSquare(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string): void {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

function getRandomColor(excludes?: Color[]): Color {
  let colorsCopy = [...colors];
  if (excludes) {
    colorsCopy = colorsCopy.filter((color) => !excludes.includes(color));
  }

  return colorsCopy[Math.floor(Math.random() * colorsCopy.length)];
}

function getItemCoordsByClickCoords([x, y]: Coordinates): Coordinates {
  const res: Coordinates = [0, 0];
  if (x !== 0) {
    res[0] = Math.floor(x / 100) * 100;
  }
  if (y !== 0) {
    res[1] = Math.floor(y / 100) * 100;
  }
  return res;
}

function drawGrid(ctx: CanvasRenderingContext2D, data: GridData): void {
  data.forEach((column, columnIndex) => {
    column.forEach((row, rowIndex) => {
      const cellX = columnIndex * squareSize;
      const cellY = rowIndex * squareSize;
      ctx.fillStyle = (rowIndex + columnIndex) % 2 === 0 ? squareColors[0] : squareColors[1];
      ctx.fillRect(cellX, cellY, squareSize, squareSize);
      drawSquare(ctx, cellX + 10, cellY + 10, 80, row.color);
    });
  });
}

function getInitialGrid(): [Item][] {
  const gridObj: GridData = [];
  for (let column = 0; column < gridSize; column++) {
    for (let row = 0; row < gridSize; row++) {
      const cellX = column * squareSize;
      const cellY = row * squareSize;

      const randColor = Math.floor(Math.random() * colors.length);
      const color = colors[randColor];

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
  return gridObj as [Item][];
}

function arrHasTIR(arr: (string | number)[]): boolean {
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

function gridHasTIR(grid: GridData): boolean {
  return grid
    .map((column) => arrHasTIR(column.map((item) => item.color)))
    .some((arrHasDuplicates) => arrHasDuplicates)
    || turnDataGrid(grid)
      .map((column) => arrHasTIR(column.map((item) => item.color)))
      .some((arrHasDuplicates) => arrHasDuplicates);
}

function combinationsEquals(first: CombinationWithItemsForRemove | Combination,
  second: CombinationWithItemsForRemove | Combination): boolean {
  const fistCombinationsEquals = first[0][0] === second[0][0]
    && first[0][1] === second[0][1];

  const secondCombinationsEquals = first[1][0] === second[1][0]
    && first[1][1] === second[1][1];

  const swappedFistCombinationsEquals = first[0][0] === second[1][0]
    && first[0][1] === second[1][1];

  const swappedSecondCombinationsEquals = first[1][0] === second[0][0]
    && first[1][1] === second[0][1];

  return (fistCombinationsEquals && secondCombinationsEquals)
    || (swappedFistCombinationsEquals && swappedSecondCombinationsEquals);
}

function findCombinations(grid: GridData): CombinationListWithItemsForRemove {
  const res: CombinationListWithItemsForRemove = [];

  function checkGridBorderCorrect(index: number): boolean {
    return index >= 0 && index <= gridSize - 1;
  }

  function checkItemsHaveNeededColor(currentColor: Color,
    items: Item[]): Item[] {
    return items.filter((item) => item.color === currentColor);
  }

  function removeDuplicates(combinationList: CombinationListWithItemsForRemove): CombinationListWithItemsForRemove {
    const listCopy = [...combinationList];
    listCopy.forEach((_, i) => {
      if (listCopy[i + 1] === undefined) return;
      if (combinationsEquals(listCopy[i], listCopy[i + 1])) {
        listCopy.splice(i, 1);
      }
    });
    return listCopy;
  }

  function findCombinationInColumnDirection(grid: GridData): CombinationListWithItemsForRemove {
    const res: CombinationListWithItemsForRemove = [];
    grid.forEach(((column, columnIndex) => {
      column.forEach((item, itemIndex) => {
        const currentColor = item.color;
        const itemSplit = [-2, -1, 1, 2];
        itemSplit.forEach((split) => {
          const inBorder = checkGridBorderCorrect(itemIndex + split);
          const position = Math.abs(split) === 1 ? 'near' : 'far';
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
              if (checkGridBorderCorrect(columnIndex - rowSplit) && checkGridBorderCorrect(columnSplit)) {
                itemsForCheck.push(grid[columnIndex - rowSplit][columnSplit]);
              }
              if (checkGridBorderCorrect(columnIndex + rowSplit) && checkGridBorderCorrect(columnSplit)) {
                itemsForCheck.push(grid[columnIndex + rowSplit][columnSplit]);
              }
              const combinationList: CombinationListWithItemsForRemove = checkItemsHaveNeededColor(currentColor,
                itemsForCheck)
                .map((combinedItem) => {
                  const res: [Coordinates, Coordinates, Coordinates[]] = [
                    [column[columnSplit].x, column[columnSplit].y],
                    [combinedItem.x, combinedItem.y],
                    [[column[columnSplit].x, column[columnSplit].y]],
                  ];
                  if (column[columnSplit - 1]?.color === combinedItem.color) {
                    res[2].push([column[columnSplit - 1].x, column[columnSplit - 1].y]);
                    if (column[columnSplit - 2]?.color === combinedItem.color) {
                      res[2].push([column[columnSplit - 2].x, column[columnSplit - 2].y]);
                    }
                  }
                  if (column[columnSplit + 1]?.color === combinedItem.color) {
                    res[2].push([column[columnSplit + 1].x, column[columnSplit + 1].y]);
                    if (column[columnSplit + 2]?.color === combinedItem.color) {
                      res[2].push([column[columnSplit + 2].x, column[columnSplit + 2].y]);
                    }
                  }

                  return res;
                });

              if (position === 'near') {
                const columnSplitForFurther = split < 0 ? itemIndex - 3 : itemIndex + 3;
                if (checkGridBorderCorrect(columnSplitForFurther)
                  && column[columnSplitForFurther].color === currentColor) {
                  const plusTwoSplit = split < 0 ? itemIndex - 2 : itemIndex + 2;
                  const plusOneSplit = split < 0 ? itemIndex - 1 : itemIndex + 1;
                  const itemsForRemove:ItemsForRemove = [[column[plusTwoSplit].x, column[plusTwoSplit].y],
                    [column[itemIndex].x, column[itemIndex].y],
                    [column[plusOneSplit].x, column[plusOneSplit].y]];
                  const combinationForPush:[Coordinates, Coordinates, Coordinates[]] = [
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
    }));
    return res;
  }

  res.push(...findCombinationInColumnDirection(grid).concat(findCombinationInColumnDirection(turnDataGrid(grid))));
  return removeDuplicates(res);
}

function replaceCombinations(data: GridData): GridData {
  return replaceHorizontalCombination(replaceVerticalCombination(data));
}

function getCursorPosition(event: React.MouseEvent<Element, MouseEvent>): Coordinates {
  const canvas = event.target as HTMLCanvasElement;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return [x, y];
}

function replaceHorizontalCombination(data: GridData): GridData {
  return turnDataGrid(replaceVerticalCombination(turnDataGrid(data)));
}

function replaceVerticalCombination(grid: GridData): GridData {
  return grid.map((column) => {
    const duplicateCounter: { [key in Color]?: number } = {};
    (column.map((item) => item.color) as Color[]).forEach((color) => {
      if (duplicateCounter[color] !== undefined) {
        (duplicateCounter[color] as number) += 1;
      } else {
        duplicateCounter[color] = 1;
      }
    });

    const duplicatesColors: Color[] = (Object.keys(duplicateCounter) as Color[])
      .filter((color) => (duplicateCounter[color] as number) >= 3);

    return column.map((item) => {
      if (duplicatesColors.includes(item.color as Color)) {
        return {
          ...item,
          color: getRandomColor([item.color]),
        };
      }
      return item;
    });
  });
}

function turnDataGrid(data: GridData): GridData {
  const emptyGrid: GridData = data.map(() => []);
  data.forEach((column) => {
    column.forEach((item, k) => {
      emptyGrid[k].push(item);
    });
  });
  return emptyGrid;
}

function combinationsIncludesCoords(combinations: CombinationListWithItemsForRemove,
  coords: Combination): boolean {
  return combinations.some(((combination) => combinationsEquals(combination, coords)));
}

function itemsCoordsEquals(first: Coordinates, second: Coordinates): boolean {
  return first[0] === second[0] && first[1] === second[1];
}

function itemsSiblings(first: Coordinates, second: Coordinates): boolean {
  return (Math.abs(first[0] - second[0]) === 100 && Math.abs(first[1] - second[1]) === 0)
    || (Math.abs(first[1] - second[1]) === 100 && Math.abs(first[0] - second[0]) === 0);
}

function coordsArrIncludesNeededCoords(coordArr:Coordinates[], coord:Coordinates):boolean {
  return coordArr.some((coordinate) => coordinate[0] === coord[0] && coordinate[1] === coord[1]);
}
function getUpdatedDataGrid(data:GridData, combinations:CombinationListWithItemsForRemove,
  firstClickCoord:Coordinates, secondClickCoord:Coordinates):GridData {
  const currentCombination = ((combinations as CombinationListWithItemsForRemove)
    .find((combination) => combinationsEquals(combination, [firstClickCoord as Coordinates,
      secondClickCoord])) as CombinationWithItemsForRemove);

  const itemsForRemove:ItemsForRemove = currentCombination[2];

  let newGridData = data.map((column, i) => {
    const currentColumnItemsForRemove = itemsForRemove
      .filter((coords) => coords[0] === column[i].x);
    const beginRemovingIndex = currentColumnItemsForRemove.length === 0 ? 0
      : Math.min(...currentColumnItemsForRemove.map((coords) => coords[1])) / 100;

    const deletedQuantity = currentColumnItemsForRemove.length;
    const columnCopy = [...column]
      .filter((item) => !coordsArrIncludesNeededCoords(currentColumnItemsForRemove, [item.x, item.y]))
      .map((item, i) => {
        if (!deletedQuantity) return item;
        if (i < beginRemovingIndex) {
          return {
            ...item,
            x: item.x,
            y: item.y + deletedQuantity * 100,
          };
        }
        return item;
      });
    for (let k = columnCopy.length; k !== gridSize; k++) {
      columnCopy.unshift({
        x: column[i].x,
        y: (gridSize - k - 1) * 100,
        color: getRandomColor(),
      });
    }

    return columnCopy;
  });
  if (gridHasTIR(newGridData)) {
    // Рекурсивный вызов, чтобы при взрыве НЕ появилось новых TIR,
    // Можно переписать на появление и взрыв новых с использованием findCombination и подсчитать очки
    //Бывает ошибка с слишком большим кол-во вызовов
    newGridData = getUpdatedDataGrid(data, combinations, firstClickCoord, secondClickCoord);
  }
  return newGridData;
}
//TODO нету свапа, и (НЕ ТОЧНО) не взрывается 4 по горизонтали
// и нужна нормальная рекурсия с подсчетом очков возможно

const GameGrid: React.FC = () => {
  const [gridData, setGridData] = useState<GridData>(getInitialGrid());
  const [firstRendered, setFirstRender] = useState<boolean>(false);
  const [firstClickCoord, setFirstClickCoord] = useState<Coordinates | null>(null);
  const [combinations, setCombinations] = useState<CombinationListWithItemsForRemove | null>(null);
  const [points, setPoints] = useState<number>(0);

  function handleClick(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void {
    const currentItemCoord = getItemCoordsByClickCoords(getCursorPosition(event));
    if (!firstClickCoord) {
      setFirstClickCoord(currentItemCoord);
      return;
    }
    if (!itemsSiblings(firstClickCoord, currentItemCoord)) {
      setFirstClickCoord(currentItemCoord);
      return;
    }

    if (!itemsCoordsEquals(firstClickCoord, currentItemCoord)) {
      const hasSuccessCombination = combinationsIncludesCoords(combinations as CombinationListWithItemsForRemove,
        [firstClickCoord, currentItemCoord]);
      if (hasSuccessCombination) {
        const updatedDataGrid = getUpdatedDataGrid(gridData, combinations as CombinationListWithItemsForRemove, firstClickCoord, currentItemCoord);
        const updatedCombinations = findCombinations(updatedDataGrid);
        setPoints((points) => points + 1);
        setGridData(updatedDataGrid);
        setCombinations(updatedCombinations);
      }
      setFirstClickCoord(null);
    }
  }

  const memoHandleClick = useCallback(handleClick, [firstClickCoord]);

  const draw = useCallback((ctx: CanvasRenderingContext2D): void => {
    let gridDataCopy: GridData = [...gridData];

    let gridHasCombination = gridHasTIR(gridDataCopy);

    function firstRender(): void {
      if (gridHasCombination) {
        gridDataCopy = replaceCombinations(gridDataCopy);
        gridHasCombination = gridHasTIR(gridDataCopy);
        firstRender();
      } else {
        setFirstRender(true);
        setGridData(gridDataCopy);
        setCombinations(findCombinations(gridDataCopy));
      }
    }

    if (!firstRendered) {
      firstRender();
    }

    drawGrid(ctx, gridData);
  },
  [gridData]);

  return (
    <div>
      <h1>Комбинаций осталось: {combinations?.length}</h1>
      <h1>Очков набрано {points * 100}</h1>
      <Canvas onClick={memoHandleClick} width={gridSize * 100} height={gridSize * 100} draw={draw} />
    </div>

  );
};
export default GameGrid;
