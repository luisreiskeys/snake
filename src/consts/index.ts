import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const HEADER_HEIGHT = 40;
export const COLS = 20;
export const PIXEL = Math.floor(width / COLS);
export const BORDER = (width % COLS) / 2;
export const BORDER_RADIUS = PIXEL / 5;
export const GAP = width / 300;
export const SNAKE_START = [{ x: 3, y: 3 }];
export const FOOD_START = { x: 10, y: 12 };
export const SPEED = 50;
export const INCREMENT = 10;
