import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Marketplace: undefined;
  CreateWish: undefined;
  Profile: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>; 