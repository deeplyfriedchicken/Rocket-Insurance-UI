export const UPDATE_RATINGS = 'UPDATE_RATINGS';
export const UPDATE_QUOTE = 'UPDATE_QUOTE';
export const UPDATE_PAGE_LOADING = 'UPDATE_PAGE_LOADING';
export const UPDATE_PREMIUM_LOADING = 'UPDATE_PREMIUM_LOADING';
export const RESET = 'RESET';

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

export interface VariableSelections {
  deductible: number;
  asteroid_collision: number;
}

export interface Quote {
  quoteId: string;
  rating_address: {
    line_1: string;
    line_2: string;
    city: string;
    region: string;
    postal: string;
  };
  policy_holder: {
    first_name: string;
    last_name: string;
  };
  variable_options: {
    deductible: {
      title: string;
      description: string;
      values: Array<number>;
    };
    asteroid_collision: {
      title: string;
      description: string;
      values: Array<number>;
    };
  };
  variable_selections: VariableSelections;
  premium: number;
}

export interface UpdatedQuote {
  quoteId: string;
  rating_address: {
    line_1: string;
    line_2: string;
    city: string;
    region: string;
    postal: string;
  };
  policy_holder: {
    first_name: string;
    last_name: string;
  };
  variable_selections: {
    deductible: number;
    asteroid_collision: number;
  };
}

export interface State {
  ratings: Ratings;
  quote: Quote;
  pageLoading: boolean;
  premiumLoading: boolean;
}

interface Reset {
  type: typeof RESET;
}

interface UpdateRatingsAction {
  type: typeof UPDATE_RATINGS;
  payload: Ratings;
}

interface UpdateQuoteAction {
  type: typeof UPDATE_QUOTE;
  payload: Quote;
}

interface UpdatePageLoadingAction {
  type: typeof UPDATE_PAGE_LOADING;
  payload: boolean;
}

interface UpdatePremiumLoadingAction {
  type: typeof UPDATE_PREMIUM_LOADING;
  payload: boolean;
}

export type ActionTypes = Reset | UpdateRatingsAction | UpdateQuoteAction
  | UpdatePageLoadingAction | UpdatePremiumLoadingAction;
