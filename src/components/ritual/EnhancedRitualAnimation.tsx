import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { MotiView } from 'moti';
import Svg, { Path, Circle, G } from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useSharedValue,
  withSequence,
  withDelay,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

const { width, height } = Dimensions.get('window');
const SIZE = Math.min(width, height) * 0.7;

interface EnhancedRitualAnimationProps {
  onComplete?: () => void;
  ritualType?: 'pact' | 'soul_fragment' | 'shadow_trade';
}

export const EnhancedRitualAnimation: React.FC<EnhancedRitualAnimationProps> = ({ 
  onComplete, 
  ritualType = 'pact' 
}) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const pulseScale = useSharedValue(1);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    // Initial fade in
    opacity.value = withTiming(1, { duration: 1000 });

    // Rotation animation
    rotation.value = withRepeat(
      withTiming(360, { duration: 4000 }),
      -1,
      false
    );

    // Scale animation
    scale.value = withSequence(
      withTiming(1.2, { duration: 1000 }),
      withTiming(1, { duration: 1000 }),
      withTiming(1.1, { duration: 1000 }),
      withTiming(1, { duration: 1000 })
    );

    // Pulse animation
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.5, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      ),
      -1,
      false
    );

    // Text fade in
    textOpacity.value = withDelay(2000, withTiming(1, { duration: 1000 }));

    // Complete after 6 seconds
    const timer = setTimeout(() => {
      onComplete?.();
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: interpolate(pulseScale.value, [1, 1.5], [0.3, 0], Extrapolate.CLAMP),
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const getRitualText = () => {
    switch (ritualType) {
      case 'soul_fragment':
        return 'Soul Fragment Bound';
      case 'shadow_trade':
        return 'Shadow Pact Sealed';
      default:
        return 'Pact Sealed';
    }
  };

  const getRitualColor = () => {
    switch (ritualType) {
      case 'soul_fragment':
        return COLORS.soulRed;
      case 'shadow_trade':
        return COLORS.shadowPurple;
      default:
        return COLORS.cosmicGold;
    }
  };

  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 1000 }}
        style={styles.ritualContainer}
      >
        {/* Pulse rings */}
        <Animated.View style={[styles.pulseRing, pulseStyle]} />
        <Animated.View style={[styles.pulseRing, pulseStyle]} />
        <Animated.View style={[styles.pulseRing, pulseStyle]} />

        {/* Main sigil */}
        <Animated.View style={[styles.sigilContainer, animatedStyle]}>
          <Svg width={SIZE} height={SIZE} viewBox="0 0 100 100">
            {/* Outer protection circle */}
            <Circle
              cx="50"
              cy="50"
              r="48"
              stroke={getRitualColor()}
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
            />
            
            {/* Main sigil circle */}
            <Circle
              cx="50"
              cy="50"
              r="45"
              stroke={getRitualColor()}
              strokeWidth="2"
              fill="none"
            />
            
            {/* Mystical symbols */}
            <G>
              {/* Pentagram */}
              <Path
                d="M50,10 L61,35 L88,35 L68,55 L78,80 L50,65 L22,80 L32,55 L12,35 L39,35 Z"
                stroke={getRitualColor()}
                strokeWidth="1"
                fill="none"
                opacity="0.8"
              />
              
              {/* Inner circle */}
              <Circle
                cx="50"
                cy="50"
                r="25"
                stroke={getRitualColor()}
                strokeWidth="1"
                fill="none"
                opacity="0.6"
              />
              
              {/* Central symbol */}
              <Circle
                cx="50"
                cy="50"
                r="8"
                fill={getRitualColor()}
                opacity="0.8"
              />
            </G>
          </Svg>
        </Animated.View>

        {/* Ritual text */}
        <Animated.View style={[styles.textContainer, textStyle]}>
          <Text style={[styles.ritualText, { color: getRitualColor() }]}>
            {getRitualText()}
          </Text>
          <Text style={styles.ritualSubtext}>
            The pact is sealed in cosmic blood
          </Text>
        </Animated.View>
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
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
  pulseRing: {
    position: 'absolute',
    width: SIZE * 2,
    height: SIZE * 2,
    borderRadius: SIZE,
    borderWidth: 2,
    borderColor: COLORS.cosmicGold,
    opacity: 0.3,
  },
  textContainer: {
    position: 'absolute',
    bottom: -SIZE * 0.3,
    alignItems: 'center',
  },
  ritualText: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  ritualSubtext: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
}); 