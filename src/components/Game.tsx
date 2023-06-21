import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, StyleSheet, Dimensions, View } from "react-native";
import { colors } from "../styles/theme";
import Board from "./Board";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import Header from "./Header";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { Coordinate, Direction, Limits } from "../@types/types";
import Snake from "./Snake";
import {
  newFoodPosition,
  testEatsFood,
  testGameOver,
} from "../utils/functions";
import Food from "./Food";
import {
  COLS,
  FOOD_START,
  HEADER_HEIGHT,
  INCREMENT,
  PIXEL,
  SNAKE_START,
  SPEED,
} from "../consts";

const { height } = Dimensions.get("window");

const Game: React.FC = () => {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_START);
  const [food, setFood] = useState<Coordinate>(FOOD_START);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGamePaused, setIsGamePaused] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const insets = useSafeAreaInsets();
  const ROWS = Math.floor(
    (height - insets?.top - insets?.bottom - HEADER_HEIGHT) / PIXEL
  );
  const limits: Limits = {
    minX: 0,
    maxX: COLS - 1,
    minY: 0,
    maxY: ROWS - 1,
  };

  function resetGame() {
    setSnake(SNAKE_START);
    setFood(FOOD_START);
    setDirection(Direction.Right);
    setScore(0);
  }

  useEffect(() => {
    if (!isGameOver) {
      const speedInterval = setInterval(() => {
        !isGamePaused && moveSnake();
      }, SPEED);
      return () => clearInterval(speedInterval);
    } else {
      resetGame();
    }
  }, [snake, isGameOver, isGamePaused]);

  function handleGesture(event: PanGestureHandlerGestureEvent) {
    const { translationX, translationY } = event.nativeEvent;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDirection(Direction.Right);
      } else {
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        setDirection(Direction.Down);
      } else {
        setDirection(Direction.Up);
      }
    }
  }

  function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
      case Direction.Right:
        head.x += 1;
        break;
      case Direction.Left:
        head.x -= 1;
        break;
      case Direction.Down:
        head.y += 1;
        break;
      case Direction.Up:
        head.y -= 1;
        break;
      default:
        break;
    }
    if (testGameOver(head, limits)) {
      setIsGameOver(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    if (testEatsFood(head, food)) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setFood(newFoodPosition(limits));
      setSnake([head, ...snake]);
      setScore((prevScore) => prevScore + INCREMENT);
    } else {
      setSnake([head, ...snake.slice(0, -1)]);
    }
  }

  const RandomFood = useMemo(() => {
    return <Food coords={{ x: food.x, y: food.y }} top={insets.top} />;
  }, [food]);

  return (
    <PanGestureHandler
      onGestureEvent={(e) => !isGameOver && !isGamePaused && handleGesture(e)}
    >
      <SafeAreaView style={styles.container}>
        <Header
          top={insets.top}
          score={score}
          paused={isGamePaused}
          pause={() => setIsGamePaused((prev) => !prev)}
          reload={() => setIsGameOver((prev) => !prev)}
        />
        <Board rows={ROWS} cols={COLS} top={insets.top} />
        <Snake snake={snake} top={insets.top} />
        {RandomFood}
      </SafeAreaView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.p6,
    flex: 1,
  },
});
export default Game;
