/* eslint-disable @typescript-eslint/camelcase */
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
  quote: {
    quoteId: '',
    rating_address: {
      line_1: '',
      line_2: '',
      city: '',
      region: '',
      postal: '',
    },
    policy_holder: {
      first_name: '',
      last_name: '',
    },
    variable_options: {
      deductible: {
        title: '',
        description: '',
        values: [],
      },
      asteroid_collision: {
        title: '',
        description: '',
        values: [],
      },
    },
    variable_selections: {
      deductible: 0,
      asteroid_collision: 0,
    },
    premium: 0,
  },
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
