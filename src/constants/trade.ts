import { TradeTokenType } from '../types/trade';
import { COLORS } from './theme';

export const TRADE_TOKEN_TYPES = {
  SOUL_FRAGMENT: {
    type: 'SOUL_FRAGMENT' as TradeTokenType,
    icon: '🩸',
    label: 'Soul Fragment',
    description: 'Eternal devotion that cannot be revoked',
    color: COLORS.soulRed,
    rarity: 'legendary',
    value: 1000,
  },
  CREATIVE_OFFERING: {
    type: 'CREATIVE_OFFERING' as TradeTokenType,
    icon: '🎨',
    label: 'Creative Offering',
    description: 'Art, music, code, design, or writing',
    color: COLORS.cosmicGold,
    rarity: 'rare',
    value: 500,
  },
  RITUAL_SERVICE: {
    type: 'RITUAL_SERVICE' as TradeTokenType,
    icon: '🕯',
    label: 'Ritual Service',
    description: 'Candle spells, energy work, guided meditation',
    color: COLORS.shadowPurple,
    rarity: 'epic',
    value: 750,
  },
  TIME_PLEDGE: {
    type: 'TIME_PLEDGE' as TradeTokenType,
    icon: '🕰',
    label: 'Time Pledge',
    description: 'Hours dedicated to a task or mission',
    color: COLORS.lunarSilver,
    rarity: 'common',
    value: 100,
  },
  EMOTIONAL_ENERGY: {
    type: 'EMOTIONAL_ENERGY' as TradeTokenType,
    icon: '💋',
    label: 'Emotional Energy',
    description: 'Love, lust, hatred, forgiveness',
    color: COLORS.etherealBlue,
    rarity: 'uncommon',
    value: 300,
  },
  SECRET_SCROLL: {
    type: 'SECRET_SCROLL' as TradeTokenType,
    icon: '📜',
    label: 'Secret Scroll',
    description: 'Confessions, secrets, forbidden truths',
    color: COLORS.mysticGreen,
    rarity: 'rare',
    value: 600,
  },
  MYTHIC_OATH: {
    type: 'MYTHIC_OATH' as TradeTokenType,
    icon: '🐉',
    label: 'Mythic Oath',
    description: 'Promises with cosmic weight',
    color: COLORS.chaosOrange,
    rarity: 'epic',
    value: 800,
  },
  FLESH_TITHE: {
    type: 'FLESH_TITHE' as TradeTokenType,
    icon: '🦴',
    label: 'Flesh Tithe',
    description: 'Symbolic body pledges and dares',
    color: COLORS.voidBlack,
    rarity: 'legendary',
    value: 1200,
  },
} as const;

export const SHADOW_LEVELS = {
  1: {
    level: 1,
    icon: '🌑',
    label: 'Shadow Level 1',
    description: 'Minor secrecy',
    color: COLORS.gradients.shadowLevel1[0],
    duration: 12 * 60 * 60 * 1000, // 12 hours
  },
  2: {
    level: 2,
    icon: '🌘',
    label: 'Shadow Level 2',
    description: 'Moderate secrecy',
    color: COLORS.gradients.shadowLevel2[0],
    duration: 24 * 60 * 60 * 1000, // 24 hours
  },
  3: {
    level: 3,
    icon: '🌗',
    label: 'Shadow Level 3',
    description: 'Maximum secrecy',
    color: COLORS.gradients.shadowLevel3[0],
    duration: 48 * 60 * 60 * 1000, // 48 hours
  },
} as const;

export const SOUL_SCORE_LEVELS = {
  NOVICE: { min: 0, max: 100, title: 'Novice Soul', icon: '🌟' },
  APPRENTICE: { min: 101, max: 500, title: 'Apprentice Soul', icon: '✨' },
  ADEPT: { min: 501, max: 1000, title: 'Adept Soul', icon: '💫' },
  MASTER: { min: 1001, max: 2500, title: 'Master Soul', icon: '⭐' },
  LEGENDARY: { min: 2501, max: 5000, title: 'Legendary Soul', icon: '🌟' },
  COSMIC: { min: 5001, max: Infinity, title: 'Cosmic Soul', icon: '🌌' },
} as const;

export const PACT_STATUS = {
  ACTIVE: { status: 'ACTIVE', label: 'Active', color: COLORS.success },
  COMPLETED: { status: 'COMPLETED', label: 'Completed', color: COLORS.info },
  BROKEN: { status: 'BROKEN', label: 'Broken', color: COLORS.error },
} as const;

export const WISH_STATUS = {
  ACTIVE: { status: 'ACTIVE', label: 'Active', color: COLORS.success },
  FULFILLED: { status: 'FULFILLED', label: 'Fulfilled', color: COLORS.info },
  EXPIRED: { status: 'EXPIRED', label: 'Expired', color: COLORS.warning },
} as const; 