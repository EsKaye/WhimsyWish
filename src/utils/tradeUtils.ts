import { TradeOffer, ShadowTrade, Wish, Pact, UserProfile, SoulFragment } from '../types/trade';
import { TRADE_TOKEN_TYPES, SOUL_SCORE_LEVELS, SHADOW_LEVELS } from '../constants/trade';

// Trade utilities
export const calculateTradeValue = (offer: TradeOffer | ShadowTrade): number => {
  const baseValue = TRADE_TOKEN_TYPES[offer.tokenType]?.value || 0;
  
  if ('isShadow' in offer && offer.isShadow) {
    const shadowMultiplier = SHADOW_LEVELS[offer.shadowLevel]?.level || 1;
    return baseValue * shadowMultiplier;
  }
  
  return baseValue;
};

export const isTradeExpired = (offer: TradeOffer | ShadowTrade): boolean => {
  if (!offer.expiresAt) return false;
  return new Date() > offer.expiresAt;
};

export const getTradeTokenInfo = (tokenType: string) => {
  return TRADE_TOKEN_TYPES[tokenType as keyof typeof TRADE_TOKEN_TYPES];
};

export const getShadowLevelInfo = (level: number) => {
  return SHADOW_LEVELS[level as keyof typeof SHADOW_LEVELS];
};

// Soul score utilities
export const calculateSoulScore = (user: UserProfile): number => {
  let score = 0;
  
  // Base score from completed pacts
  score += user.completedPacts * 100;
  
  // Bonus for soul fragments
  score += user.soulFragments.length * 50;
  
  // Penalty for broken pacts
  score -= user.brokenPacts * 200;
  
  // Penalty for being a vowbreaker
  score -= user.vowbreakerCount * 500;
  
  return Math.max(0, score);
};

export const getSoulScoreLevel = (score: number) => {
  for (const [level, info] of Object.entries(SOUL_SCORE_LEVELS)) {
    if (score >= info.min && score <= info.max) {
      return { level, ...info };
    }
  }
  return SOUL_SCORE_LEVELS.NOVICE;
};

// Wish utilities
export const isWishExpired = (wish: Wish): boolean => {
  if (!wish.expiresAt) return false;
  return new Date() > wish.expiresAt;
};

export const getWishStatus = (wish: Wish): string => {
  if (wish.status !== 'ACTIVE') return wish.status;
  if (isWishExpired(wish)) return 'EXPIRED';
  return 'ACTIVE';
};

export const getActiveTradeOffers = (wish: Wish): (TradeOffer | ShadowTrade)[] => {
  return wish.tradeOffers.filter(offer => 
    !offer.isAccepted && !isTradeExpired(offer)
  );
};

export const getAcceptedTradeOffers = (wish: Wish): (TradeOffer | ShadowTrade)[] => {
  return wish.tradeOffers.filter(offer => offer.isAccepted);
};

// Pact utilities
export const isPactActive = (pact: Pact): boolean => {
  return pact.status === 'ACTIVE';
};

export const isPactCompleted = (pact: Pact): boolean => {
  return pact.status === 'COMPLETED';
};

export const isPactBroken = (pact: Pact): boolean => {
  return pact.status === 'BROKEN';
};

// Soul fragment utilities
export const isSoulFragmentRedeemed = (fragment: SoulFragment): boolean => {
  return fragment.isRedeemed;
};

export const getUnredeemedSoulFragments = (fragments: SoulFragment[]): SoulFragment[] => {
  return fragments.filter(fragment => !fragment.isRedeemed);
};

// Validation utilities
export const validateTradeOffer = (offer: Partial<TradeOffer | ShadowTrade>): string[] => {
  const errors: string[] = [];
  
  if (!offer.description || offer.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters long');
  }
  
  if (!offer.value || offer.value <= 0) {
    errors.push('Value must be greater than 0');
  }
  
  if ('isShadow' in offer && offer.isShadow && !offer.expiresAt) {
    errors.push('Shadow trades must have an expiration date');
  }
  
  return errors;
};

export const validateWish = (wish: Partial<Wish>): string[] => {
  const errors: string[] = [];
  
  if (!wish.title || wish.title.trim().length < 5) {
    errors.push('Title must be at least 5 characters long');
  }
  
  if (!wish.description || wish.description.trim().length < 20) {
    errors.push('Description must be at least 20 characters long');
  }
  
  if (!wish.desiredOutcome || wish.desiredOutcome.trim().length < 10) {
    errors.push('Desired outcome must be at least 10 characters long');
  }
  
  return errors;
};

// Formatting utilities
export const formatSoulScore = (score: number): string => {
  if (score >= 1000) {
    return `${(score / 1000).toFixed(1)}k`;
  }
  return score.toString();
};

export const formatTimeRemaining = (expiresAt: Date): string => {
  const now = new Date();
  const diff = expiresAt.getTime() - now.getTime();
  
  if (diff <= 0) return 'Expired';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  }
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  
  return `${minutes}m`;
}; 