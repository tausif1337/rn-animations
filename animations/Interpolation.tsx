import React, { useRef } from 'react';
import { Animated, View, Button, StyleSheet } from 'react-native';

export default function Interpolation() {
  // 1️⃣ Create an animated value (starts at 0)
  const anim = useRef(new Animated.Value(0)).current;

  // 2️⃣ Function to trigger the animation
  const startAnimation = () => {
    Animated.timing(anim, {
      toValue: 1,           // animate from 0 → 1
      duration: 2000,       // over 2 seconds
      useNativeDriver: false, // false because we’re animating color & size
    }).start(() => {
      // reset back to 0 for replay
      anim.setValue(0);
    });
  };

  // 3️⃣ Interpolations
  const moveX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250], // move from 0px → 250px
  });

  const moveY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -250], // move from 0px → 250px
  });

  const boxSize = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 150], // grow from 50px → 150px
  });

  const boxColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ff6b6b', '#1dd1a1'], // red → green
  });

  // 4️⃣ Apply interpolated values to style
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ translateX: moveX }, { translateY: moveY }],
            width: boxSize,
            height: boxSize,
            backgroundColor: boxColor,
          },
        ]}
      />
      <Button title="Start Animation" onPress={startAnimation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    borderRadius: 8,
    marginBottom: 30,
  },
});