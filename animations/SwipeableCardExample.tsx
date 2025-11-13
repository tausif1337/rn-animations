import React, { useCallback, useMemo, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type Card = {
  id: number;
  title: string;
  description: string;
  background: string;
};

const CARDS: Card[] = [
  {
    id: 1,
    title: "Explore Kyoto",
    description:
      "Lose yourself in lantern-lit alleys filled with ramen and history.",
    background: "#FF6B6B",
  },
  {
    id: 2,
    title: "Ski in Niseko",
    description: "Chase the softest powder on the planet, one run at a time.",
    background: "#4ECDC4",
  },
  {
    id: 3,
    title: "Surf Bali",
    description:
      "Morning waves, sunset temples, and never-ending tropical vibes.",
    background: "#45B7D1",
  },
  {
    id: 4,
    title: "Café-hop Seoul",
    description:
      "Minimalist cafés, hidden rooftops, and the best pastries around.",
    background: "#FFE66D",
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const CARD_HEIGHT = 420;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

type SwipeableCardProps = {
  card: Card;
  onSwipeComplete: () => void;
};

const SwipeableCard = ({ card, onSwipeComplete }: SwipeableCardProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const rotation = useMemo(() => 15, []);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotateZ: `${(translateX.value / SCREEN_WIDTH) * rotation}deg` },
    ],
  }));

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const projectedX = translateX.value + event.velocityX * 0.2;
      const shouldDismiss = Math.abs(projectedX) > SWIPE_THRESHOLD;

      if (shouldDismiss) {
        const direction = translateX.value > 0 ? 1 : -1;
        const toX = direction * (SCREEN_WIDTH * 1.5);

        translateX.value = withTiming(toX, { duration: 220 }, (finished) => {
          if (finished) {
            runOnJS(onSwipeComplete)();
          }
        });

        translateY.value = withTiming(
          translateY.value + event.velocityY * 0.1,
          {
            duration: 220,
          }
        );
      } else {
        translateX.value = withSpring(0, { damping: 18, stiffness: 200 });
        translateY.value = withSpring(0, { damping: 18, stiffness: 200 });
      }
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.card, { backgroundColor: card.background }, cardStyle]}
      >
        <Text style={styles.cardTitle}>{card.title}</Text>
        <Text style={styles.cardDescription}>{card.description}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default function SwipeableCardExample() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeComplete = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CARDS.length);
  }, []);

  const currentCard = CARDS[currentIndex];
  const nextCard = CARDS[(currentIndex + 1) % CARDS.length];

  return (
    <View style={styles.container}>
      <View style={styles.stack}>
        <View
          style={[
            styles.card,
            styles.nextCard,
            { backgroundColor: nextCard.background },
          ]}
        >
          <Text style={styles.cardTitle}>{nextCard.title}</Text>
          <Text style={styles.cardDescription}>{nextCard.description}</Text>
        </View>
        <SwipeableCard
          key={currentCard.id}
          card={currentCard}
          onSwipeComplete={handleSwipeComplete}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#101418",
  },
  stack: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 24,
    padding: 24,
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  nextCard: {
    transform: [{ scale: 0.95 }, { translateY: 18 }],
    opacity: 0.8,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#051014",
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: "#051014",
  },
});
