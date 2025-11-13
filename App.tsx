import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AnimatedValue from "./animations/AnimatedValue";
import ScrollInterpolation from "./animations/ScrollInterpolation";
import Interpolation from "./animations/Interpolation";
import AnimatedEventExample from "./animations/AnimatedEventExample";
import SpringExample from "./animations/SpringExample";
import DecayExample from "./animations/DecayExample";
import AnimatedStyleUpdateExample from "./animations/AnimatedStyleUpdateExample";
import GestureHandlerExample from "./animations/GestureHandlerExample";
import SwipeableCardExample from "./animations/SwipeableCardExample";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
          {/* <AnimatedValue /> */}
          {/* <Interpolation/> */}
          {/* <ScrollInterpolation /> */}
          {/* <AnimatedEventExample /> */}
          {/* <SpringExample /> */}
          {/* <DecayExample /> */}
          {/* <AnimatedStyleUpdateExample /> */}
          {/* <GestureHandlerExample /> */}
          <SwipeableCardExample />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
});
