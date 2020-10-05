import Ratings from '../components/Ratings/Ratings';
import Quote from '../components/Quote/Quote';

export const defaultPath = '/';

export const routes = [
  {
    name: 'ratings', path: '/', exact: true, component: Ratings,
  },
  {
    name: 'quote', path: '/quote', component: Quote,
  },
];

export default {
  defaultPath,
  routes,
};
