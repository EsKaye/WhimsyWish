import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Wish, TradeOffer, ShadowTrade, Pact, UserProfile, SoulFragment } from '../types/trade';

// State types
interface AppState {
  user: UserProfile | null;
  wishes: Wish[];
  activePacts: Pact[];
  soulFragments: SoulFragment[];
  isLoading: boolean;
  error: string | null;
}

// Action types
type AppAction =
  | { type: 'SET_USER'; payload: UserProfile }
  | { type: 'SET_WISHES'; payload: Wish[] }
  | { type: 'ADD_WISH'; payload: Wish }
  | { type: 'UPDATE_WISH'; payload: Wish }
  | { type: 'ADD_TRADE_OFFER'; payload: { wishId: string; offer: TradeOffer | ShadowTrade } }
  | { type: 'ACCEPT_TRADE'; payload: { wishId: string; offerId: string } }
  | { type: 'CREATE_PACT'; payload: Pact }
  | { type: 'UPDATE_PACT'; payload: Pact }
  | { type: 'ADD_SOUL_FRAGMENT'; payload: SoulFragment }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: AppState = {
  user: null,
  wishes: [],
  activePacts: [],
  soulFragments: [],
  isLoading: false,
  error: null,
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'SET_WISHES':
      return { ...state, wishes: action.payload };
    
    case 'ADD_WISH':
      return { ...state, wishes: [action.payload, ...state.wishes] };
    
    case 'UPDATE_WISH':
      return {
        ...state,
        wishes: state.wishes.map(wish =>
          wish.id === action.payload.id ? action.payload : wish
        ),
      };
    
    case 'ADD_TRADE_OFFER':
      return {
        ...state,
        wishes: state.wishes.map(wish =>
          wish.id === action.payload.wishId
            ? {
                ...wish,
                tradeOffers: [...wish.tradeOffers, action.payload.offer],
              }
            : wish
        ),
      };
    
    case 'ACCEPT_TRADE':
      return {
        ...state,
        wishes: state.wishes.map(wish =>
          wish.id === action.payload.wishId
            ? {
                ...wish,
                tradeOffers: wish.tradeOffers.map(offer =>
                  offer.id === action.payload.offerId
                    ? { ...offer, isAccepted: true, acceptedAt: new Date() }
                    : offer
                ),
              }
            : wish
        ),
      };
    
    case 'CREATE_PACT':
      return {
        ...state,
        activePacts: [...state.activePacts, action.payload],
      };
    
    case 'UPDATE_PACT':
      return {
        ...state,
        activePacts: state.activePacts.map(pact =>
          pact.id === action.payload.id ? action.payload : pact
        ),
      };
    
    case 'ADD_SOUL_FRAGMENT':
      return {
        ...state,
        soulFragments: [...state.soulFragments, action.payload],
      };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Selectors
export const useUser = () => {
  const { state } = useApp();
  return state.user;
};

export const useWishes = () => {
  const { state } = useApp();
  return state.wishes;
};

export const useActivePacts = () => {
  const { state } = useApp();
  return state.activePacts;
};

export const useSoulFragments = () => {
  const { state } = useApp();
  return state.soulFragments;
};

export const useLoading = () => {
  const { state } = useApp();
  return state.isLoading;
};

export const useError = () => {
  const { state } = useApp();
  return state.error;
}; 