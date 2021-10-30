import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Canvas from '../Canvas/Canvas';
import { GameProps } from '../../pages/game/Game';
import {
  Coordinates,
  Item,
  CoordinatesForRemove,
  CombinationListWithCoordinatesForRemove,
  GridData,
} from './utils/types';
import { drawGrid } from './utils/drawer';
import { CANVAS_SQUARE_SIZE, GRID_SIZE, MAX_GAME_TURNS } from './utils/config';
import countScore from './utils/score';
import {
  drawMovingDownStep,
  drawSwapStep,
  drawTilesAsDeleted,
  SwapDirection,
} from './utils/animation.drawer';
import {
  combinationsIncludesCoords, findCombinations,
  getCursorPosition,
  getInitialGrid,
  getItemCoordsByClickCoords, getUpdatedDataGrid, gridHasTIR,
  itemsCoordsEquals,
  itemsSiblings, replaceCombinations,
} from './utils/core';

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
  background-color: #d6eaf8;

  &:hover {
    background-color: #aed6f1;
  }
  &:disabled {
    background-color: #ebf5fb;
    cursor: not-allowed;
  }
`;

type GameGridProps = GameProps;

const GameGrid: React.VFC<GameGridProps> = (props) => {
  const [gridData, setGridData] = useState<GridData>(getInitialGrid());
  const [firstRendered, setFirstRender] = useState(false);
  const [firstClickCoord, setFirstClickCoord] = useState<Coordinates | null>(null);
  const [firstTileToSwap, setFirstTileToSwap] = useState<Item | null>(null);
  const [secondTileToSwap, setSecondTileToSwap] = useState<Item | null>(null);
  const [movingDownTiles, setMovingDownTiles] = useState<GridData>([[]]);
  const [tilesForRemove, setTilesForRemove] = useState<CoordinatesForRemove>([]);
  const [swapDirection, setSwapDirection] = useState<SwapDirection | null>(null);
  const [combinations, setCombinations] = useState<CombinationListWithCoordinatesForRemove | null>(null);
  const [points, setPoints] = useState(0);
  const [turns, setTurns] = useState(MAX_GAME_TURNS);

  const onNewGame = (): void => {
    setFirstClickCoord(null);
    setFirstTileToSwap(null);
    setSecondTileToSwap(null);
    setMovingDownTiles([[]]);
    setTilesForRemove([]);
    setSwapDirection(null);
    setGridData(getInitialGrid());
    setFirstRender(false);
    setPoints(0);
    setTurns(MAX_GAME_TURNS);
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
    if (!itemsCoordsEquals(firstClickCoord, currentItemCoord) && combinations) {
      const hasSuccessCombination = combinationsIncludesCoords(combinations, [
        firstClickCoord,
        currentItemCoord,
      ]);
      if (hasSuccessCombination) {
        setTilesForSwap(firstClickCoord, currentItemCoord);
        const {
          movingDownTiles,
          itemsForRemove,
          newGridData: updatedDataGrid,
        } = getUpdatedDataGrid(
          gridData,
          combinations as CombinationListWithCoordinatesForRemove,
          firstClickCoord,
          currentItemCoord,
        );
        setMovingDownTiles(movingDownTiles);
        setTilesForRemove(itemsForRemove);
        const updatedCombinations = findCombinations(updatedDataGrid);

        setPoints((points) => points + countScore(itemsForRemove.length));
        decreaseTurns();
        setGridData(updatedDataGrid);
        setCombinations(updatedCombinations);
      }
      setFirstClickCoord(null);
    }
  }

  const memoHandleClick = useCallback(handleClick, [firstClickCoord]);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D): void => {
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
    [gridData],
  );

  function setTilesForSwap(
    firstClickCoord: Coordinates,
    secondClickCoord: Coordinates,
  ): void {
    if (firstClickCoord && secondClickCoord) {
      if (firstClickCoord[0] === secondClickCoord[0]) {
        setSwapDirection('vertical');
        if (firstClickCoord[1] < secondClickCoord[1]) {
          setFirstTileToSwap(gridData[firstClickCoord[0]][firstClickCoord[1]]);
          setSecondTileToSwap(gridData[secondClickCoord[0]][secondClickCoord[1]]);
        } else if (firstClickCoord[1] > secondClickCoord[1]) {
          setFirstTileToSwap(gridData[secondClickCoord[0]][secondClickCoord[1]]);
          setSecondTileToSwap(gridData[firstClickCoord[0]][firstClickCoord[1]]);
        }
      } else if (firstClickCoord[1] === secondClickCoord[1]) {
        setSwapDirection('horizontal');
        if (firstClickCoord[0] < secondClickCoord[0]) {
          setFirstTileToSwap(gridData[firstClickCoord[0]][firstClickCoord[1]]);
          setSecondTileToSwap(gridData[secondClickCoord[0]][secondClickCoord[1]]);
        } else if (firstClickCoord[0] > secondClickCoord[0]) {
          setFirstTileToSwap(gridData[secondClickCoord[0]][secondClickCoord[1]]);
          setSecondTileToSwap(gridData[firstClickCoord[0]][firstClickCoord[1]]);
        }
      }
    }
  }

  const preDraw = (
    ctx: CanvasRenderingContext2D,
    stage: string,
    relativeDuration: number,
  ): void => {
    if (stage === 'swap' && firstTileToSwap && secondTileToSwap && swapDirection) {
      drawSwapStep(
        ctx,
        firstTileToSwap,
        secondTileToSwap,
        relativeDuration,
        swapDirection,
      );
    } else if (stage === 'delete' && tilesForRemove.length > 0) {
      drawTilesAsDeleted(ctx, tilesForRemove);
      setTilesForRemove([]);
    } else if (stage === 'fill' && movingDownTiles.length > 0) {
      drawMovingDownStep(ctx, movingDownTiles, relativeDuration);
      setMovingDownTiles([[]]);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Комбинаций осталось: {combinations?.length}</h1>
        <h1>Ходов осталось: {turns}</h1>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h1>Очков набрано {points}</h1>
        <Button onClick={onNewGame}>Начать заново</Button>
      </div>
      <div>
        <Canvas
          onClick={memoHandleClick}
          width={GRID_SIZE * CANVAS_SQUARE_SIZE}
          height={GRID_SIZE * CANVAS_SQUARE_SIZE}
          draw={draw}
          preDraw={preDraw}
        />
      </div>
    </div>
  );
};
export default GameGrid;
