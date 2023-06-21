import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/theme";
import { BORDER, BORDER_RADIUS, GAP, HEADER_HEIGHT, PIXEL } from "../consts";
// import { Container } from './styles';
type BoardProps = {
  rows: number;
  cols: number;
  top: number;
};

function Board({ rows, cols, top }: BoardProps): JSX.Element {
  const dots = Array(rows * cols).fill(0);

  return (
    <View style={[styles.board, { top: HEADER_HEIGHT + top }]}>
      {dots.map((_, index) => (
        <View style={styles.pixel} key={index}></View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    position: "absolute",
    marginHorizontal: BORDER,
  },
  pixel: {
    width: PIXEL,
    height: PIXEL,
    borderColor: colors.p6,
    borderWidth: GAP,
    borderRadius: BORDER_RADIUS,
    backgroundColor: colors.p5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Board;
