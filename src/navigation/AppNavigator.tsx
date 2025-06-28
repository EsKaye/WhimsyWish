import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MarketplaceScreen } from '../screens/marketplace/MarketplaceScreen';
import { CreateWishScreen } from '../screens/marketplace/CreateWishScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MarketplaceStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '600',
      },
    }}
  >
    <Stack.Screen
      name="Marketplace"
      component={MarketplaceScreen}
      options={{ title: 'Soul Market' }}
    />
    <Stack.Screen
      name="CreateWish"
      component={CreateWishScreen}
      options={{ title: 'New Pact' }}
    />
  </Stack.Navigator>
);

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#000',
            borderTopColor: '#333',
          },
          tabBarActiveTintColor: '#ff4444',
          tabBarInactiveTintColor: '#666',
        }}
      >
        <Tab.Screen
          name="MarketplaceStack"
          component={MarketplaceStack}
          options={{
            title: 'Market',
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 24 }}>🩸</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 24 }}>👤</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}; 