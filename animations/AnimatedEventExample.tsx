import React, { useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const AnimatedEventExample = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const translateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -150],
    extrapolate: "clamp",
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.box, { transform: [{ translateY }] }]}
      />
      <Animated.ScrollView
        contentContainerStyle={styles.content}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    height: 1000,
  },
  box: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
    width: 100,
    height: 100,
    backgroundColor: "tomato",
    borderRadius: 8,
  },
});

export default AnimatedEventExample;
