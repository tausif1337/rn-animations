import React, { useRef } from "react";
import { View, Animated, ScrollView, StyleSheet } from "react-native";

export default function AnimatedEventExample() {
  const scrollY = useRef(new Animated.Value(0)).current; // 1️⃣ Create animated value

  return (
    <View style={styles.container}>
      {/* 2️⃣ Animated Circle */}
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 300],
                  outputRange: [0, 200], // move 200px when scrolled 300px
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      />

      {/* 3️⃣ ScrollView drives scrollY using Animated.event */}
      <Animated.ScrollView
        style={styles.scroll}
        scrollEventThrottle={16} // updates ~60fps
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true } // use native thread for smoothness
        )}
      >
        <View style={{ height: 1000 }} />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  circle: {
    position: "absolute",
    top: 100,
    left: 150,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "tomato",
  },
});
