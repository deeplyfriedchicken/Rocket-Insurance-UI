import React from 'react';

import Reducer from './Reducer';

import { State, ActionTypes } from './types';

interface ContextProps {
  state: State;
  dispatch: React.Dispatch<ActionTypes>;
}

export const initialState: State = {
  ratings: {
    firstName: '',
    lastName: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      region: '',
      postal: '',
    }
  },
  quote: undefined,
  pageLoading: false,
  premiumLoading: false,
};

export const Context = React.createContext({} as ContextProps);

const Store: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(Reducer, initialState);

  const value = { state, dispatch };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};


export default Store;
