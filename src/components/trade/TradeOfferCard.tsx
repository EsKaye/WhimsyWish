import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TradeOffer, TradeTokenType } from '../../types/trade';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY, SHADOWS } from '../../constants/theme';
import { TRADE_TOKEN_TYPES } from '../../constants/trade';
import { isTradeExpired, formatTimeRemaining } from '../../utils/tradeUtils';

interface TradeOfferCardProps {
  offer: TradeOffer;
  onPress: (offer: TradeOffer) => void;
}

export const TradeOfferCard: React.FC<TradeOfferCardProps> = ({ offer, onPress }) => {
  const tokenInfo = TRADE_TOKEN_TYPES[offer.tokenType];
  const expired = isTradeExpired(offer);

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 500 }}
    >
      <Pressable onPress={() => onPress(offer)}>
        <LinearGradient
          colors={expired ? [COLORS.surface, COLORS.surfaceVariant] : [COLORS.surface, COLORS.surfaceElevated]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.container, expired && styles.expiredContainer]}
        >
          <View style={styles.header}>
            <Text style={styles.tokenIcon}>{tokenInfo.icon}</Text>
            <View style={styles.headerText}>
              <Text style={[styles.tokenType, expired && styles.expiredText]}>
                {tokenInfo.label}
              </Text>
              <Text style={styles.tokenDescription}>
                {tokenInfo.description}
              </Text>
            </View>
            <View style={[styles.rarityBadge, styles[`rarity${tokenInfo.rarity}`]]}>
              <Text style={styles.rarityText}>{tokenInfo.rarity}</Text>
            </View>
          </View>
          
          <Text style={[styles.description, expired && styles.expiredText]}>
            {offer.description}
          </Text>
          
          <View style={styles.footer}>
            <View style={styles.valueContainer}>
              <Text style={styles.valueLabel}>Value</Text>
              <Text style={[styles.value, expired && styles.expiredText]}>
                {offer.value} ⚡
              </Text>
            </View>
            
            {offer.expiresAt && (
              <View style={styles.expiryContainer}>
                <Text style={styles.expiryLabel}>Expires</Text>
                <Text style={[styles.expiry, expired && styles.expiredText]}>
                  {formatTimeRemaining(offer.expiresAt)}
                </Text>
              </View>
            )}
          </View>

          {offer.soulFragment && (
            <View style={styles.soulFragment}>
              <Text style={styles.soulFragmentText}>🩸 Soul Fragment Bound</Text>
            </View>
          )}

          {expired && (
            <View style={styles.expiredOverlay}>
              <Text style={styles.expiredLabel}>EXPIRED</Text>
            </View>
          )}
        </LinearGradient>
      </Pressable>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
    marginHorizontal: SPACING.md,
    ...SHADOWS.medium,
  },
  expiredContainer: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  tokenIcon: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    marginRight: SPACING.sm,
  },
  headerText: {
    flex: 1,
  },
  tokenType: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    textTransform: 'capitalize',
  },
  tokenDescription: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  rarityBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.xs,
  },
  raritycommon: {
    backgroundColor: COLORS.textTertiary,
  },
  rarityuncommon: {
    backgroundColor: COLORS.mysticGreen,
  },
  rarityrare: {
    backgroundColor: COLORS.etherealBlue,
  },
  rarityepic: {
    backgroundColor: COLORS.shadowPurple,
  },
  raritylegendary: {
    backgroundColor: COLORS.cosmicGold,
  },
  rarityText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.weights.medium,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  valueContainer: {
    alignItems: 'flex-start',
  },
  valueLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textTertiary,
    marginBottom: 2,
  },
  value: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.cosmicGold,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  expiryContainer: {
    alignItems: 'flex-end',
  },
  expiryLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textTertiary,
    marginBottom: 2,
  },
  expiry: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
  },
  soulFragment: {
    marginTop: SPACING.md,
    padding: SPACING.sm,
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
  },
  soulFragmentText: {
    color: COLORS.soulRed,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  expiredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expiredLabel: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    textTransform: 'uppercase',
  },
  expiredText: {
    color: COLORS.textTertiary,
  },
}); 