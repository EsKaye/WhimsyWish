import React from 'react';
import { View, Text, StyleSheet, Pressable, ColorValue } from 'react-native';
import { ShadowTrade } from '../../types/trade';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

interface ShadowTradeCardProps {
  trade: ShadowTrade;
  onPress: (trade: ShadowTrade) => void;
}

export const ShadowTradeCard: React.FC<ShadowTradeCardProps> = ({ trade, onPress }) => {
  const getShadowLevel = (level: number) => {
    switch (level) {
      case 1:
        return '🌑';
      case 2:
        return '🌘';
      case 3:
        return '🌗';
      default:
        return '🌑';
    }
  };

  const getGradientColors = (level: number): [ColorValue, ColorValue] => {
    switch (level) {
      case 1:
        return ['#1a1a1a', '#2a2a2a'];
      case 2:
        return ['#2a1a2a', '#3a2a3a'];
      case 3:
        return ['#3a2a3a', '#4a3a4a'];
      default:
        return ['#1a1a1a', '#2a2a2a'];
    }
  };

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 500 }}
    >
      <Pressable onPress={() => onPress(trade)}>
        <LinearGradient
          colors={getGradientColors(trade.shadowLevel)}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <View style={styles.header}>
            <Text style={styles.shadowLevel}>{getShadowLevel(trade.shadowLevel)}</Text>
            <Text style={styles.shadowLabel}>Shadow Trade</Text>
          </View>
          
          <Text style={styles.description}>{trade.description}</Text>
          
          <View style={styles.footer}>
            <Text style={styles.value}>Value: {trade.value} ⚡</Text>
            <Text style={styles.expiry}>
              Expires: {new Date(trade.expiresAt).toLocaleDateString()}
            </Text>
          </View>

          {trade.soulFragment && (
            <View style={styles.soulFragment}>
              <Text style={styles.soulFragmentText}>🩸 Soul Fragment Bound</Text>
            </View>
          )}
        </LinearGradient>
      </Pressable>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  shadowLevel: {
    fontSize: 24,
    marginRight: 8,
  },
  shadowLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    fontSize: 14,
    color: '#ffd700',
    fontWeight: '500',
  },
  expiry: {
    fontSize: 12,
    color: '#888',
  },
  soulFragment: {
    marginTop: 12,
    padding: 8,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 6,
    alignItems: 'center',
  },
  soulFragmentText: {
    color: '#ff4444',
    fontSize: 12,
    fontWeight: '500',
  },
}); 