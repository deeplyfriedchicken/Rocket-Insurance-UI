import { State, ActionTypes } from './types';

const Reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case 'UPDATE_RATINGS':
      return {
        ...state,
        ratings: action.payload,
      };
    case 'UPDATE_QUOTE':
      return {
        ...state,
        quote: action.payload,
      };
    case 'UPDATE_PREMIUM':
      return {
        ...state,
        premium: action.payload,
      };
    case 'UPDATE_PAGE_LOADING':
      return {
        ...state,
        pageLoading: action.payload,
      };
    case 'UPDATE_PREMIUM_LOADING':
      return {
        ...state,
        premiumLoading: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
