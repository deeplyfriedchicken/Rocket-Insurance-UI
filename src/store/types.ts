export const UPDATE_RATINGS = 'UPDATE_RATINGS';
export const UPDATE_QUOTE = 'UPDATE_QUOTE';
export const UPDATE_PREMIUM = 'UPDATE_PREMIUM';
export const UPDATE_PAGE_LOADING = 'UPDATE_PAGE_LOADING';
export const UPDATE_PREMIUM_LOADING = 'UPDATE_PREMIUM_LOADING';

interface Address {
  line1: string;
  line2: string;
  city: string;
  region: string;
  postal: string;
}

export interface Ratings {
  firstName: string;
  lastName: string;
  address: Address;
}

interface Quote {
  deductible: number;
  asteroidCollision: number;
}

export interface State {
  ratings: Ratings;
  quote: Quote;
  premium: number;
  pageLoading: boolean;
  premiumLoading: boolean;
}

interface UpdateRatingsAction {
  type: typeof UPDATE_RATINGS;
  payload: Ratings;
}

interface UpdateQuoteAction {
  type: typeof UPDATE_QUOTE;
  payload: Quote;
}

interface UpdatePremiumAction {
  type: typeof UPDATE_PREMIUM;
  payload: number;
}

interface UpdatePageLoadingAction {
  type: typeof UPDATE_PAGE_LOADING;
  payload: boolean;
}

interface UpdatePremiumLoadingAction {
  type: typeof UPDATE_PREMIUM_LOADING;
  payload: boolean;
}

export type ActionTypes = UpdateRatingsAction | UpdateQuoteAction | UpdatePremiumAction | UpdatePageLoadingAction | UpdatePremiumLoadingAction;
