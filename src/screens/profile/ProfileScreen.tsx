import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserProfile } from '../../types/trade';

// Temporary mock data
const MOCK_PROFILE: UserProfile = {
  id: 'user1',
  username: 'SoulTrader',
  soulScore: 850,
  vowbreakerCount: 0,
  activePacts: 3,
  completedPacts: 12,
  brokenPacts: 0,
  soulFragments: [],
  createdAt: new Date(),
  lastActive: new Date(),
};

export const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{MOCK_PROFILE.username}</Text>
        <Text style={styles.soulScore}>⚡ {MOCK_PROFILE.soulScore}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{MOCK_PROFILE.activePacts}</Text>
          <Text style={styles.statLabel}>Active Pacts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{MOCK_PROFILE.completedPacts}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{MOCK_PROFILE.brokenPacts}</Text>
          <Text style={styles.statLabel}>Broken</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  soulScore: {
    fontSize: 18,
    color: '#ffd700',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
}); 