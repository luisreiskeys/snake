import { Text, View } from "react-native";
import { Coordinate } from "../@types/types";
import { BORDER, HEADER_HEIGHT, PIXEL } from "../consts";

const foodemojis = [
  "🍏",
  "🍎",
  "🍐",
  "🍊",
  "🍋",
  "🍌",
  "🍉",
  "🍇",
  "🍓",
  "🫐",
  "🍈",
  "🍒",
  "🍑",
  "🥭",
  "🍍",
  "🥥",
  "🥝",
  "🍅",
];

interface FoodProps {
  coords: Coordinate;
  top: number;
}

export default function Food({ coords, top }: FoodProps): JSX.Element {
  const randDomFood = foodemojis[Math.floor(Math.random() * foodemojis.length)];
  const foodStyle = {
    width: PIXEL,
    height: PIXEL,
    top: coords.y * PIXEL + HEADER_HEIGHT + top,
    left: coords.x * PIXEL + BORDER,
  };
  return (
    <View style={[{ position: "absolute" }, foodStyle]}>
      <Text>{randDomFood}</Text>
    </View>
  );
}
