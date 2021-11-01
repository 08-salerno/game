import { Color } from './colors';

export type Coordinates = [number, number]
export type Item = { color: Color, x: number, y: number };
export type Combination = [Coordinates, Coordinates]
export type CombinationPosition = 'near' | 'far';
export type CoordinatesForRemove = Coordinates[]
export type CombinationWithCoordinatesForRemove = [Coordinates, Coordinates, CoordinatesForRemove]
export type CombinationListWithCoordinatesForRemove = [Coordinates, Coordinates, Coordinates[]][];
export type GridData = Item[][];
export type GridDataWithEmpty = (Item | null)[][];
export type SwapInfo = { from: Item, to: Item, direction: SwapDirection }
export type DrawFn = (ctx: CanvasRenderingContext2D, relativeDuration?: number) => void
export type DrawQueueItem = {
    name: string;
    animationTime?: number;
    drawFn: DrawFn;
    afterFn?: (ctx: CanvasRenderingContext2D) => void;
}
export type MovingDownItemPairs = {from: Item, to: Item}[];
export type SwapDirection = 'horizontal' | 'vertical';
