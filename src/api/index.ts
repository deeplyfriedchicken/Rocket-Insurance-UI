/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';

import { Quote, Ratings, UpdatedQuote } from '../store/types';

const { REACT_APP_API_URL: baseURL } = process.env;

const instance = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  timeout: 1000,
})

export const createQuote = async (ratings: Ratings): Promise<Quote | undefined> => {
  try {
    const { data } = await instance.post('/quotes', {
      "first_name": ratings.firstName,
      "last_name": ratings.lastName,
      "address": {
        "line_1": ratings.address.line1,
        "line2": ratings.address.line2,
        "city": ratings.address.city,
        "region": ratings.address.region,
        "postal": ratings.address.postal,
      }
    });
    return data?.quote;
  }
  catch (err) {
    console.error(err);
    return;
  }
}

export const updateQuote = async (quoteData: UpdatedQuote): Promise<Quote | undefined> => {
  try {
    const { data } = await instance.put(`/quotes/${quoteData.quoteId}`, { quote: quoteData });
    return data?.quote;
  }
  catch(err) {
    console.error(err);
    return;
  }
}

export default {
  createQuote,
  updateQuote,
}
