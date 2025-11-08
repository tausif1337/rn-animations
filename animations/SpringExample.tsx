import React, { useRef } from "react";
import { View, Animated, Button, StyleSheet } from "react-native";

export default function SpringExample() {
  const position = useRef(new Animated.Value(0)).current;

  const startSpring = () => {
    position.setValue(0); // reset
    Animated.spring(position, {
      toValue: 1,
      friction: 3, // controls "bounciness"
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [
              {
                scale: position.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 1],
                }),
              },
            ],
          },
        ]}
      />
      <Button title="Start Spring" onPress={startSpring} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "skyblue",
    marginBottom: 20,
  },
});
