import React, { useRef } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function ScrollInterpolation() {
  // 1️⃣ Create an animated value that tracks scroll position
  const scrollY = useRef(new Animated.Value(0)).current;

  // 2️⃣ Interpolate the scroll value → header height
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],       // scroll distance
    outputRange: [150, 70],     // header shrinks from 150 → 70
    extrapolate: 'clamp',       // don’t go smaller than 70
  });

  // 3️⃣ Interpolate the scroll value → title opacity
  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],        // fade out
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Animated Header */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
          Animated Header
        </Animated.Text>
      </Animated.View>

      {/* Animated ScrollView */}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } // we’re animating layout (height)
        )}
        scrollEventThrottle={16}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>Item {i + 1}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
  },
  scrollContent: {
    paddingTop: 10,
  },
  row: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});