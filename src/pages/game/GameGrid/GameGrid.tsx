import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GameProps } from '../Game';
import {
  Coordinates,
  CombinationListWithCoordinatesForRemove,
  GridData,
  DrawQueueItem,
} from './utils/types';
import {
  CANVAS_SQUARE_SIZE,
  GRID_SIZE,
  MAX_GAME_TURNS,
} from './utils/config';
import countScore from './utils/score';
import {
  findCombinations,
  getCursorPosition,
  getItemCoordsByClickCoords,
  gridHasTIR,
  itemsCoordsEquals,
  isCoordinateSiblings,
} from './utils/core';
import {
  deleteMatched,
  firstMatchOrFalse,
  generateGridWithOutTIR,
  moveDown,
  getSwapInfo,
  cloneGrid,
} from './utils/core.v2';
import Canvas from './Canvas/Canvas';
import {
  drawDeleteTransition,
  drawGridTransition, drawMoveDownTransition,
  drawSelectTransition, drawShuffleTransition,
  drawSwapTransition,
  drawWrongSwapTransitions,
} from './utils/transitions';

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
  const [gridData, setGridData] = useState<GridData>(generateGridWithOutTIR());
  const [firstRendered, setFirstRender] = useState(false);
  const [firstClickCoord, setFirstClickCoord] = useState<Coordinates | null>(null);
  const [combinations, setCombinations] = useState<CombinationListWithCoordinatesForRemove | null>(null);
  const [points, setPoints] = useState(0);
  const [turns, setTurns] = useState(MAX_GAME_TURNS);
  const [stage, setStage] = useState<'delete' | 'moveDown' | 'shuffle' | null>(null);
  const [transitions, setTransitions] = useState<DrawQueueItem[]>([]);
  const [canvasDrawQueue, setCanvasDrawQueue] = useState<DrawQueueItem[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const onNewGame = (): void => {
    setFirstClickCoord(null);
    setGridData(generateGridWithOutTIR());
    setFirstRender(false);
    setStage(null);
    setPoints(0);
    setTurns(MAX_GAME_TURNS);
    setTransitions([]);
    setIsAnimating(false);
  };

  const decreaseTurns = (): void => {
    setTurns(turns - 1);
  };

  const addTransitions = (...transitions: DrawQueueItem[]): void => {
    setTransitions((prevTransitions) => [...prevTransitions, ...transitions]);
  };

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
    if (isAnimating) {
      return;
    }

    const currentItemCoord = getItemCoordsByClickCoords(getCursorPosition(event));

    if (!firstClickCoord) {
      setFirstClickCoord(currentItemCoord);
      addTransitions(drawSelectTransition(currentItemCoord));
      return;
    }

    if (!isCoordinateSiblings(firstClickCoord, currentItemCoord)) {
      setFirstClickCoord(currentItemCoord);
      addTransitions(
        drawGridTransition(gridData, 'drawPreSelect'),
        drawSelectTransition(currentItemCoord),
      );
      return;
    }

    if (!itemsCoordsEquals(firstClickCoord, currentItemCoord)) {
      // включаем флаг, который блокирует клики по гриду пока идёт анимация
      setIsAnimating(true);

      const { direction, from, to } = getSwapInfo(
        gridData,
        firstClickCoord,
        currentItemCoord,
      );

      // Свапаем, чтобы проверить
      const temp = from.color;
      from.color = to.color;
      to.color = temp;

      const swapMadeMatch = !!firstMatchOrFalse(gridData);
      if (swapMadeMatch) {
        setGridData(cloneGrid(gridData));
        setStage('delete');

        addTransitions(...drawSwapTransition(gridData, from, to, direction, decreaseTurns));
      } else {
        // свапаем обратно
        const temp = from.color;
        from.color = to.color;
        to.color = temp;

        addTransitions(...drawWrongSwapTransitions(gridData, from, to, direction, decreaseTurns));
      }
      setFirstClickCoord(null);
    }
  };

  // генерация грида при новой игре
  useEffect(() => {
    if (!firstRendered) {
      // если есть TIR, то убираем их
      const gridHasTir = gridHasTIR(gridData);
      if (gridHasTir) {
        setGridData(generateGridWithOutTIR());
        return;
      }

      // если нет комбинаций, то генерим новое поле
      const combinations = findCombinations(gridData);
      if (combinations.length === 0) {
        setGridData(generateGridWithOutTIR());
        return;
      }

      // поле сгенерено и есть комбинации, можно играть
      setFirstRender(true);
      setCombinations(combinations);

      addTransitions(drawGridTransition(gridData));
    }
  }, [gridData]);

  // Основной алгоритм обработки действий в гриде
  useEffect(() => {
    if (firstRendered) {
      if (stage === 'delete') {
        const matched = firstMatchOrFalse(gridData);

        if (!matched) {
          const combinations = findCombinations(gridData);
          if (combinations.length === 0) {
            setStage('shuffle');
            return;
          }
          setCombinations(combinations);
          setStage(null);
          return;
        }

        const gridClone = cloneGrid(gridData);
        deleteMatched(gridClone, matched);
        setGridData(gridClone);

        addTransitions(drawDeleteTransition(matched, () => {
          setPoints((points) => points + countScore(matched.length));
        }));

        setStage('moveDown');
      } else if (stage === 'moveDown') {
        const gridClone = cloneGrid(gridData);
        const verticalSwapMovingDownPairs = moveDown(gridClone);
        setGridData(gridClone);

        addTransitions(drawMoveDownTransition(verticalSwapMovingDownPairs));
        setStage('delete');
      } else if (stage === 'shuffle') {
        if (turns > 0) {
          let shuffle = true;
          let newGrid = generateGridWithOutTIR();
          while (shuffle) {
            const combinations = findCombinations(newGrid);
            if (combinations.length === 0) {
              newGrid = generateGridWithOutTIR();
            } else {
              setGridData(newGrid);
              setCombinations(combinations);
              setStage(null);
              shuffle = false;
            }
          }

          addTransitions(drawShuffleTransition(), drawGridTransition(newGrid, 'drawGridAfterShuffle'));
        }
      }
    }
  }, [stage]);

  // Отслеживается конец игры в виде окончания ходов + ждёт окончания анимации
  useEffect(() => {
    if (turns === 0 && !isAnimating) {
      props.onGameOver(points);
      onNewGame();
    }
  }, [turns, isAnimating]);

  // Запускает анимации, когда расчёт действий в гриде окочен
  useEffect(() => {
    if (stage === null && transitions.length > 0) {
      if (isAnimating) {
        // немного кастыльно, но выключаем так состояние анимации
        transitions.push({
          name: 'offAnimating',
          drawFn: () => {
            setIsAnimating(false);
          },
        });
      }
      setCanvasDrawQueue(transitions);
      setTransitions([]);
    }
  }, [stage, transitions]);

  return (
    <div>
        <h1>Комбинаций осталось: {combinations?.length}</h1>
        <h1>Ходов осталось: {turns}</h1>
        <h1>Очков набрано {points}</h1>
        <Button onClick={onNewGame}>Начать заново</Button>
      <div style={{ marginTop: '10px' }}>
        <Canvas
          onClick={handleClick}
          width={GRID_SIZE * CANVAS_SQUARE_SIZE}
          height={GRID_SIZE * CANVAS_SQUARE_SIZE}
          drawQueue={canvasDrawQueue}
        />
      </div>
    </div>
  );
};
export default GameGrid;
