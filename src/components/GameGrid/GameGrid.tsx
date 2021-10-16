import React, {
  useCallback, useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import Canvas from '../Canvas/Canvas';
import acorn from './images/acorn.png';
import bee from './images/bee.png';
import cactus from './images/cactus.png';
import fish from './images/fish.png';
import mushroom from './images/mushroom.png';
import ladybug from './images/ladybug.png';
import snow from './images/snow.png';
import { GameProps } from '../../pages/game/Game';

// TIR = Three in row

type Color = 'Sienna' | 'MediumAquamarine' | 'LightSalmon' | 'Gold' | 'white' | 'pink' | 'MediumPurple';
type Coordinates = [number, number]
type Item = { color: Color, x: number, y: number };
type Combination = [Coordinates, Coordinates]
type ItemsForRemove = Coordinates[]
type CombinationWithItemsForRemove = [Coordinates, Coordinates, ItemsForRemove]
type CombinationListWithItemsForRemove = [Coordinates, Coordinates, Coordinates[]][];

const colors: Color[] = ['Sienna', 'MediumAquamarine', 'LightSalmon', 'Gold', 'white', 'pink', 'MediumPurple'];

type GridData = Item[][];

const gridSize = 9;

const squareSize = 100;

const acornImg = new Image();
acornImg.src = acorn;
const cactusImg = new Image();
cactusImg.src = cactus;
const fishImg = new Image();
fishImg.src = fish;
const beeImg = new Image();
beeImg.src = bee;
const snowImg = new Image();
snowImg.src = snow;
const mushroomImg = new Image();
mushroomImg.src = mushroom;
const ladybugImg = new Image();
ladybugImg.src = ladybug;

function drawSquare(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string): void {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
  let img: HTMLImageElement | null = null;
  switch (color) {
    case 'Sienna':
      img = acornImg;
      break;
    case 'MediumAquamarine':
      img = cactusImg;
      break;
    case 'LightSalmon':
      img = fishImg;
      break;
    case 'Gold':
      img = beeImg;
      break;
    case 'white':
      img = snowImg;
      break;
    case 'pink':
      img = mushroomImg;
      break;
    case 'MediumPurple':
      img = ladybugImg;
      break;
    default:
      break;
  }
  if (img) {
    ctx.drawImage(img, x, y, size, size);
  }
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
      //ctx.fillStyle = (rowIndex + columnIndex) % 2 === 0 ? squareColors[0] : squareColors[1];
      //ctx.fillRect(cellX, cellY, squareSize, squareSize);
      drawSquare(ctx, cellX, cellY, 100, row.color);
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
  firstClickCoord:Coordinates, secondClickCoord:Coordinates): {
    movingDownTiles: GridData,
    itemsForRemove: ItemsForRemove,
    newGridData: GridData
  } {
  const currentCombination = ((combinations as CombinationListWithItemsForRemove)
    .find((combination) => combinationsEquals(combination, [firstClickCoord as Coordinates,
      secondClickCoord])) as CombinationWithItemsForRemove);

  const itemsForRemove:ItemsForRemove = currentCombination[2];

  const a = data[firstClickCoord[0] / 100][firstClickCoord[1] / 100].color;
  const b = data[secondClickCoord[0] / 100][secondClickCoord[1] / 100].color;
  data[firstClickCoord[0] / 100][firstClickCoord[1] / 100].color = b;
  data[secondClickCoord[0] / 100][secondClickCoord[1] / 100].color = a;

  const movingDownTiles: GridData = [];
  let newGridData = data.map((column, i) => {
    const currentColumnItemsForRemove = itemsForRemove
      .filter((coords) => coords[0] === column[i].x);
    const beginRemovingIndex = currentColumnItemsForRemove.length === 0 ? 0
      : Math.min(...currentColumnItemsForRemove.map((coords) => coords[1])) / 100;

    const deletedQuantity = currentColumnItemsForRemove.length;
    let columnCopy = [...column]
      .filter((item) => !coordsArrIncludesNeededCoords(currentColumnItemsForRemove, [item.x, item.y]));
    movingDownTiles[i] = [];
    columnCopy = columnCopy.map((item, j) => {
      if (!deletedQuantity) return item;
      if (j < beginRemovingIndex) {
        movingDownTiles[i].push(item);
        return {
          ...item,
          x: item.x,
          y: item.y + deletedQuantity * 100,
        };
      }
      return item;
    });
    for (let k = columnCopy.length; k !== gridSize; k++) {
      const newItem = {
        x: column[i].x,
        y: (gridSize - k - 1) * 100,
        color: getRandomColor(),
      };
      movingDownTiles[i].unshift({ ...newItem, y: newItem.y - 100 * deletedQuantity });
      columnCopy.unshift(newItem);
    }

    return columnCopy;
  });
  if (gridHasTIR(newGridData)) {
    //TODO нету свапа и нужна нормальная рекурсия с подсчетом очков возможно
    // Рекурсивный вызов, чтобы при взрыве НЕ появилось новых TIR,
    // Можно переписать на появление и взрыв новых с использованием findCombination и подсчитать очки
    //Бывает ошибка с слишком большим кол-во вызовов
    newGridData = getUpdatedDataGrid(data, combinations, firstClickCoord, secondClickCoord).newGridData;
  }
  return { movingDownTiles, itemsForRemove, newGridData };
}

const Button = styled.button`
  display: inline-block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  font-family: Arial;
  font-weight: normal;
  font-size: inherit;
  text-decoration: none;
  cursor: pointer;
  width: auto;
  height: 37px;
  padding: 0 8px;
  border-radius: 8px;
  color: black;
  background-color: #D6EAF8;

  &:hover {
    background-color: #AED6F1;
  }
  &:disabled {
    background-color: #EBF5FB;
    cursor: not-allowed;
  }
`;

const MaxGameTurns = 10;

type GameGridProps = GameProps

const GameGrid: React.VFC<GameGridProps> = (props) => {
  const [gridData, setGridData] = useState<GridData>(getInitialGrid());
  const [firstRendered, setFirstRender] = useState<boolean>(false);
  const [firstClickCoord, setFirstClickCoord] = useState<Coordinates | null>(null);
  const [firstTileToSwap, setFirstTileToSwap] = useState<Item | null>(null);
  const [secondTileToSwap, setSecondTileToSwap] = useState<Item | null>(null);
  const [movingDownTiles, setMovingDownTiles] = useState<GridData>([[]]);
  const [tilesForRemove, setTilesForRemove] = useState<ItemsForRemove>([]);
  const [swapDirection, setSwapDirection] = useState<string | null>(null);
  const [combinations, setCombinations] = useState<CombinationListWithItemsForRemove | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [turns, setTurns] = useState<number>(MaxGameTurns);

  const onNewGame = ():void => {
    setFirstClickCoord(null);
    setFirstTileToSwap(null);
    setSecondTileToSwap(null);
    setMovingDownTiles([[]]);
    setTilesForRemove([]);
    setSwapDirection(null);
    setGridData(getInitialGrid());
    setFirstRender(false);
    setPoints(0);
    setTurns(MaxGameTurns);
  };

  useEffect(() => {
    if (turns === 0) {
      props.onGameOver(points);
      onNewGame();
    }
  }, [turns]);

  const decreaseTurns = (): void => {
    setTurns(turns - 1);
  };

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
        setTilesForSwap(firstClickCoord, currentItemCoord);
        const { movingDownTiles, itemsForRemove, newGridData: updatedDataGrid } = getUpdatedDataGrid(
          gridData, combinations as CombinationListWithItemsForRemove, firstClickCoord, currentItemCoord,
        );
        setMovingDownTiles(movingDownTiles);
        setTilesForRemove(itemsForRemove);
        const updatedCombinations = findCombinations(updatedDataGrid);

        setPoints((points) => points + 100);
        decreaseTurns();
        setGridData(updatedDataGrid);
        setCombinations(updatedCombinations);
      }
      setFirstClickCoord(null);
    }
  }

  const memoHandleClick = useCallback(handleClick, [firstClickCoord]);

  const draw = useCallback((ctx: CanvasRenderingContext2D): void => {
    let gridDataCopy: GridData = [...gridData];

    let gridHasTir = gridHasTIR(gridDataCopy);

    function firstRender(): void {
      if (gridHasTir) {
        //TODO добавить проверку на наличие комбинацций(актуально для маленьких сеток)
        gridDataCopy = replaceCombinations(gridDataCopy);
        gridHasTir = gridHasTIR(gridDataCopy);
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

  function setTilesForSwap(firstClickCoord: Coordinates, secondClickCoord: Coordinates): void {
    if (firstClickCoord && secondClickCoord) {
      if (firstClickCoord[0] === secondClickCoord[0]) {
        setSwapDirection('y');
        if (firstClickCoord[1] < secondClickCoord[1]) {
          setFirstTileToSwap(gridData[firstClickCoord[0] / 100][firstClickCoord[1] / 100]);
          setSecondTileToSwap(gridData[secondClickCoord[0] / 100][secondClickCoord[1] / 100]);
        } else if (firstClickCoord[1] > secondClickCoord[1]) {
          setFirstTileToSwap(gridData[secondClickCoord[0] / 100][secondClickCoord[1] / 100]);
          setSecondTileToSwap(gridData[firstClickCoord[0] / 100][firstClickCoord[1] / 100]);
        }
      } else if (firstClickCoord[1] === secondClickCoord[1]) {
        setSwapDirection('x');
        if (firstClickCoord[0] < secondClickCoord[0]) {
          setFirstTileToSwap(gridData[firstClickCoord[0] / 100][firstClickCoord[1] / 100]);
          setSecondTileToSwap(gridData[secondClickCoord[0] / 100][secondClickCoord[1] / 100]);
        } else if (firstClickCoord[0] > secondClickCoord[0]) {
          setFirstTileToSwap(gridData[secondClickCoord[0] / 100][secondClickCoord[1] / 100]);
          setSecondTileToSwap(gridData[firstClickCoord[0] / 100][firstClickCoord[1] / 100]);
        }
      }
    }
  }
  function swapTilesAnimation(ctx: CanvasRenderingContext2D, multiplier: number): void {
    if (firstTileToSwap && secondTileToSwap) {
      if (swapDirection === 'x') {
        drawSquare(ctx, firstTileToSwap.x + 100 * multiplier, firstTileToSwap.y, 100, secondTileToSwap.color);
        drawSquare(ctx, secondTileToSwap.x - 100 * multiplier, secondTileToSwap.y, 100, firstTileToSwap.color);
      } else if (swapDirection === 'y') {
        drawSquare(ctx, firstTileToSwap.x, firstTileToSwap.y + 100 * multiplier, 100, secondTileToSwap.color);
        drawSquare(ctx, secondTileToSwap.x, secondTileToSwap.y - 100 * multiplier, 100, firstTileToSwap.color);
      }
    }
  }
  function deleteTilesAnimation(ctx: CanvasRenderingContext2D, multiplier: number): void {
    if (tilesForRemove) {
      //ctx.fillStyle = 'black';
      ctx.fillStyle = `rgba(255, 255, 255, ${multiplier / 5})`;

      tilesForRemove.forEach((item) => {
        ctx.fillRect(item[0], item[1], 100, 100);
        /* ctx.fillRect(
          item[0] + 50 * (1 - relativeDuration), item[1] + 50 * (1 - relativeDuration),
          100 * relativeDuration, 100 * relativeDuration,
        ); */
      });
    }
  }
  function fillTilesAnimation(ctx: CanvasRenderingContext2D, multiplier: number): void {
    if (movingDownTiles) {
      movingDownTiles.forEach((column) => {
        const length = column.reduce((prev, { y }) => (y < 0 ? prev + 1 : prev), 0);
        column.forEach((tile) => {
          drawSquare(ctx, tile.x, tile.y + length * 100 * multiplier, 100, tile.color);
        });
      });
    }
  }
  const preDraw = (ctx: CanvasRenderingContext2D, stage: string, relativeDuration: number): void => {
    if (stage === 'swap') {
      swapTilesAnimation(ctx, relativeDuration);
    } else if (stage === 'delete') {
      deleteTilesAnimation(ctx, relativeDuration);
    } else if (stage === 'fill') {
      fillTilesAnimation(ctx, relativeDuration);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>Комбинаций осталось: {combinations?.length}</h1>
          <h1>Ходов осталось: {turns}</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Очков набрано {points}</h1>
          <Button onClick={onNewGame}>Начать заново</Button>
      </div>
      <div>
          <Canvas
            onClick={memoHandleClick}
            width={gridSize * 100}
            height={gridSize * 100}
            draw={draw}
            predraw={preDraw}
          />
      </div>
    </div>

  );
};
export default GameGrid;
