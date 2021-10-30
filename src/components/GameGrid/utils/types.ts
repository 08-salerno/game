import { Color } from './colors';

export type Coordinates = [number, number]
export type Item = { color: Color, x: number, y: number };
export type Combination = [Coordinates, Coordinates]
export type CombinationPosition = 'near' | 'far';
export type CoordinatesForRemove = Coordinates[]
export type CombinationWithCoordinatesForRemove = [Coordinates, Coordinates, CoordinatesForRemove]
export type CombinationListWithCoordinatesForRemove = [Coordinates, Coordinates, Coordinates[]][];
export type GridData = Item[][];
