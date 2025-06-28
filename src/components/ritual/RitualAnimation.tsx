import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import Svg, { Path, Circle } from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useSharedValue,
  withSequence,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const SIZE = width * 0.8;

interface RitualAnimationProps {
  onComplete?: () => void;
}

export const RitualAnimation: React.FC<RitualAnimationProps> = ({ onComplete }) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 3000 }),
      -1,
      false
    );
    scale.value = withSequence(
      withTiming(1.2, { duration: 1000 }),
      withTiming(1, { duration: 1000 })
    );

    const timer = setTimeout(() => {
      onComplete?.();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 1000 }}
        style={styles.ritualContainer}
      >
        <Animated.View style={[styles.sigilContainer, animatedStyle]}>
          <Svg width={SIZE} height={SIZE} viewBox="0 0 100 100">
            {/* Outer Circle */}
            <Circle
              cx="50"
              cy="50"
              r="45"
              stroke="#ffd700"
              strokeWidth="2"
              fill="none"
            />
            
            {/* Sigil Path */}
            <Path
              d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10"
              stroke="#ff4444"
              strokeWidth="2"
              fill="none"
            />
            
            {/* Inner Elements */}
            <Circle
              cx="50"
              cy="50"
              r="20"
              stroke="#ffd700"
              strokeWidth="1"
              fill="none"
            />
          </Svg>
        </Animated.View>

        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 2000,
            loop: true,
          }}
          style={styles.energyPulse}
        />
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  ritualContainer: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sigilContainer: {
    position: 'absolute',
  },
  energyPulse: {
    position: 'absolute',
    width: SIZE * 1.5,
    height: SIZE * 1.5,
    borderRadius: SIZE * 0.75,
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
  },
}); 