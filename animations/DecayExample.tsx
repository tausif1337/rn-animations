import React, { useRef } from 'react';
import { View, Animated, Button, StyleSheet } from 'react-native';

export default function DecayExample() {
  const position = useRef(new Animated.Value(0)).current;

  const startDecay = () => {
    position.setValue(0);
    Animated.decay(position, {
      velocity: 0.8, // initial speed
      deceleration: 0.995, // rate of slowdown
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ translateX: position }],
          },
        ]}
      />
      <Button title="Start Decay" onPress={startDecay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  circle: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'tomato', marginBottom: 20 },
});