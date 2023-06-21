export interface Coordinate {
  x: number;
  y: number;
}

export enum Direction {
  Right,
  Left,
  Up,
  Down,
}

export interface Limits {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}
