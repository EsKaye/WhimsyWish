export type SoulFragment = {
  id: string;
  ownerId: string;
  createdAt: Date;
  isRedeemed: boolean;
  redemptionDate?: Date;
};

export type TradeTokenType = 
  | 'SOUL_FRAGMENT'
  | 'CREATIVE_OFFERING'
  | 'RITUAL_SERVICE'
  | 'TIME_PLEDGE'
  | 'EMOTIONAL_ENERGY'
  | 'SECRET_SCROLL'
  | 'MYTHIC_OATH'
  | 'FLESH_TITHE';

export type TradeOffer = {
  id: string;
  wishId: string;
  offererId: string;
  tokenType: TradeTokenType;
  description: string;
  value: number; // Abstract value unit
  createdAt: Date;
  expiresAt?: Date;
  isAccepted: boolean;
  acceptedAt?: Date;
  soulFragment?: SoulFragment;
};

export type ShadowTrade = {
  id: string;
  wishId: string;
  offererId: string;
  tokenType: TradeTokenType;
  description: string;
  value: number;
  createdAt: Date;
  expiresAt: Date; // Shadow trades must expire
  isAccepted: boolean;
  acceptedAt?: Date;
  soulFragment?: SoulFragment;
  isShadow: true;
  shadowLevel: 1 | 2 | 3; // Level of secrecy
};

export type Wish = {
  id: string;
  userId: string;
  title: string;
  description: string;
  desiredOutcome: string;
  isPublic: boolean;
  createdAt: Date;
  expiresAt?: Date;
  status: 'ACTIVE' | 'FULFILLED' | 'EXPIRED';
  soulScore: number;
  tradeOffers: (TradeOffer | ShadowTrade)[];
  shadowTrades?: ShadowTrade[];
};

export type Pact = {
  id: string;
  wishId: string;
  offerId: string;
  participants: string[];
  terms: string;
  ritualPerformed: boolean;
  ritualDate?: Date;
  status: 'ACTIVE' | 'COMPLETED' | 'BROKEN';
  createdAt: Date;
  completedAt?: Date;
  brokenAt?: Date;
  soulFragments: SoulFragment[];
};

export type UserProfile = {
  id: string;
  username: string;
  soulScore: number;
  vowbreakerCount: number;
  activePacts: number;
  completedPacts: number;
  brokenPacts: number;
  soulFragments: SoulFragment[];
  createdAt: Date;
  lastActive: Date;
}; 