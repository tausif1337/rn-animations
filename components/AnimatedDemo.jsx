import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";

export default function AnimatedDemo() {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const fontSizeIncrease = useRef(new Animated.Value(18)).current;
  const backgroundColorChange = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false, // Font size doesn't support native driver
      }),
      Animated.timing(fontSizeIncrease, {
        toValue: 30,
        duration: 2000,
        useNativeDriver: false, // Font size doesn't support native driver
      }),
      Animated.timing(backgroundColorChange, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false, // Background color doesn't support native driver
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable>
        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeIn,
              backgroundColor: backgroundColorChange.interpolate({
                inputRange: [0, 1],
                outputRange: ["blue", "red"],
              }),
            },
          ]}
        >
          <Animated.Text style={[styles.text, { fontSize: fontSizeIncrease }]}>
            Press me
          </Animated.Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});