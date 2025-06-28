import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { TradeOffer, TradeTokenType } from '../../types/trade';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

const TOKEN_ICONS: Record<TradeTokenType, string> = {
  SOUL_FRAGMENT: '🩸',
  CREATIVE_OFFERING: '🎨',
  RITUAL_SERVICE: '🕯',
  TIME_PLEDGE: '🕰',
  EMOTIONAL_ENERGY: '💋',
  SECRET_SCROLL: '📜',
  MYTHIC_OATH: '🐉',
  FLESH_TITHE: '🦴',
};

interface TradeOfferCardProps {
  offer: TradeOffer;
  onPress: (offer: TradeOffer) => void;
}

export const TradeOfferCard: React.FC<TradeOfferCardProps> = ({ offer, onPress }) => {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 500 }}
    >
      <Pressable onPress={() => onPress(offer)}>
        <LinearGradient
          colors={['#1a1a1a', '#2a2a2a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <View style={styles.header}>
            <Text style={styles.tokenIcon}>{TOKEN_ICONS[offer.tokenType]}</Text>
            <Text style={styles.tokenType}>{offer.tokenType.replace('_', ' ')}</Text>
          </View>
          
          <Text style={styles.description}>{offer.description}</Text>
          
          <View style={styles.footer}>
            <Text style={styles.value}>Value: {offer.value} ⚡</Text>
            {offer.expiresAt && (
              <Text style={styles.expiry}>
                Expires: {new Date(offer.expiresAt).toLocaleDateString()}
              </Text>
            )}
          </View>

          {offer.soulFragment && (
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
  tokenIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  tokenType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'capitalize',
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