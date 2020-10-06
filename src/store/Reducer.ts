import { initialState } from './Store';
import { RESET, UPDATE_RATINGS, UPDATE_QUOTE, UPDATE_PAGE_LOADING, UPDATE_PREMIUM_LOADING, State, ActionTypes } from './types';

const Reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case UPDATE_RATINGS:
      return {
        ...state,
        ratings: action.payload,
      };
    case UPDATE_QUOTE:
      return {
        ...state,
        quote: action.payload,
      };
    case UPDATE_PAGE_LOADING:
      return {
        ...state,
        pageLoading: action.payload,
      };
    case UPDATE_PREMIUM_LOADING:
      return {
        ...state,
        premiumLoading: action.payload,
      };
    case RESET:
      return {
        ...initialState,
      }
    default:
      return state;
  }
};

export default Reducer;
