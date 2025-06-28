import React, { useState } from 'react';
import { View, Text, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { TradeOfferCard } from '../../components/trade/TradeOfferCard';
import { ShadowTradeCard } from '../../components/trade/ShadowTradeCard';
import { TradeOffer, Wish, ShadowTrade } from '../../types/trade';
import { MotiView } from 'moti';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../types/navigation';

// Update mock data to include shadow trades
const MOCK_WISHES: Wish[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Manifest 10k Followers',
    description: 'I seek the adoration of 10,000 souls on the digital plane.',
    desiredOutcome: 'Viral growth and influence',
    isPublic: true,
    createdAt: new Date(),
    status: 'ACTIVE',
    soulScore: 85,
    tradeOffers: [
      {
        id: '1',
        wishId: '1',
        offererId: 'user2',
        tokenType: 'SOUL_FRAGMENT',
        description: 'I offer a fragment of my eternal soul in exchange for your wish.',
        value: 1000,
        createdAt: new Date(),
        isAccepted: false,
        soulFragment: {
          id: 'sf1',
          ownerId: 'user2',
          createdAt: new Date(),
          isRedeemed: false,
        },
      },
    ],
    shadowTrades: [
      {
        id: 'st1',
        wishId: '1',
        offererId: 'user3',
        tokenType: 'SECRET_SCROLL',
        description: 'I offer forbidden knowledge that will grant your wish...',
        value: 2000,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        isAccepted: false,
        isShadow: true,
        shadowLevel: 3,
      },
    ],
  },
];

export const MarketplaceScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>(MOCK_WISHES);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Implement actual refresh logic
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const handleOfferPress = (offer: TradeOffer | ShadowTrade) => {
    // TODO: Implement offer interaction
    console.log('Offer pressed:', offer);
  };

  const renderWish = ({ item: wish }: { item: Wish }) => (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500 }}
      style={styles.wishContainer}
    >
      <View style={styles.wishHeader}>
        <View style={styles.wishTitleContainer}>
          <Text style={styles.wishTitle}>{wish.title}</Text>
          <Text style={styles.soulScore}>⚡ {wish.soulScore}</Text>
        </View>
        <Text style={styles.wishDescription}>{wish.description}</Text>
      </View>

      {wish.tradeOffers.map((offer) => (
        <TradeOfferCard
          key={offer.id}
          offer={offer}
          onPress={handleOfferPress}
        />
      ))}

      {wish.shadowTrades?.map((trade) => (
        <ShadowTradeCard
          key={trade.id}
          trade={trade}
          onPress={handleOfferPress}
        />
      ))}
    </MotiView>
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={wishes}
        renderItem={renderWish}
        estimatedItemSize={200}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ffd700"
          />
        }
      />
      
      <MotiView
        from={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'timing', duration: 500 }}
        style={styles.fabContainer}
      >
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('CreateWish')}
        >
          <Text style={styles.fabIcon}>✨</Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  wishContainer: {
    marginVertical: 8,
  },
  wishHeader: {
    padding: 16,
    backgroundColor: '#111',
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  wishTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  wishTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  soulScore: {
    fontSize: 16,
    color: '#ffd700',
    fontWeight: '500',
  },
  wishDescription: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  fabIcon: {
    fontSize: 24,
  },
}); 