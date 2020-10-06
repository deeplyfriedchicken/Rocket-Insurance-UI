/* eslint-disable @typescript-eslint/camelcase */
import { Quote, Ratings, UpdatedQuote } from '../store/types';

const { REACT_APP_API_URL: baseURL } = process.env;

export const createQuote = async (ratings: Ratings): Promise<Quote | undefined> => {
  try {
    const URL = `${baseURL}/quotes`;
    const init = {
      method: 'POST',
      mode: 'cors' as RequestMode,
      body: JSON.stringify({
        "first_name": ratings.firstName,
        "last_name": ratings.lastName,
        "address": {
          "line_1": ratings.address.line1,
          "line2": ratings.address.line2,
          "city": ratings.address.city,
          "region": ratings.address.region,
          "postal": ratings.address.postal,
        },
      }),
    };

    const request = new Request(URL, init);
    const response = await fetch(request);
    const data: Record<string, Quote> = await response.json();
    return data?.quote;
  }
  catch (err) {
    console.error(err);
    return;
  }
}

export const updateQuote = async (quoteData: UpdatedQuote): Promise<Quote | undefined> => {
  const URL = `${baseURL}/quotes/${quoteData.quoteId}`;
  const init = {
    method: 'PUT',
    mode: 'cors' as RequestMode,
    body: JSON.stringify({ quote: quoteData }),
  };
  try {
    const request = new Request(URL, init);
    const response = await fetch(request);
    const data: Record<string, Quote> = await response.json();
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
