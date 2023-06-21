import { Coordinate, Limits } from "../@types/types";

export function testGameOver(snakeHead: Coordinate, limites: Limits): boolean {
  return (
    snakeHead.x < limites.minX ||
    snakeHead.x > limites.maxX ||
    snakeHead.y < limites.minY ||
    snakeHead.y > limites.maxY
  );
}

export function testEatsFood(
  snakeHead: Coordinate,
  foodLocation: Coordinate
): boolean {
  return snakeHead.x == foodLocation.x && snakeHead.y == foodLocation.y;
}

export function newFoodPosition(limites: Limits): Coordinate {
  return {
    x: Math.floor(Math.random() * limites.maxX),
    y: Math.floor(Math.random() * limites.maxY),
  };
}
