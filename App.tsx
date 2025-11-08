import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import AnimatedValue from "./animations/AnimatedValue";
import ScrollInterpolation from "./animations/ScrollInterpolation";
import Interpolation from "./animations/Interpolation";
import AnimatedEventExample from "./animations/AnimatedEventExample";
import SpringExample from "./animations/SpringExample";
import DecayExample from "./animations/DecayExample";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <AnimatedValue /> */}
      {/* <Interpolation/> */}
      {/* <ScrollInterpolation /> */}
      <AnimatedEventExample />
      {/* <SpringExample /> */}
      {/* <DecayExample /> */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 24,
    paddingHorizontal: 16,
  },
});
