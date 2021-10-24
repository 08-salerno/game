import { Color } from './colors';

export type Coordinates = [number, number]
export type Item = { color: Color, x: number, y: number };
export type Combination = [Coordinates, Coordinates]
export type ItemsForRemove = Coordinates[]
export type CombinationWithItemsForRemove = [Coordinates, Coordinates, ItemsForRemove]
export type CombinationListWithItemsForRemove = [Coordinates, Coordinates, Coordinates[]][];
export type GridData = Item[][];
