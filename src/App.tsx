import React from 'react';

import './assets/main.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, Theme, ThemeOptions, ThemeProvider } from '@material-ui/core/styles';

import Store from './store/Store';
import Layout from './components/Layout/Layout';

console.log(process.env.REACT_APP_API_URL);

const themeOptions: ThemeOptions = {
  palette: {
    background: {
      default: 'fff',
    },
    primary: {
      light: '#243862',
      main: '#212446',
      dark: '#212446',
      contrastText: '#fff',
    },
    secondary: {
      light: '#5b5f6f',
      main: '#47AB8C',
      dark: '#207F8C ',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
  },
}

const theme: Theme = createMuiTheme(themeOptions);

const App: React.FC = () => (
  <Store>
    <ThemeProvider theme={theme}>
      <Router>
        <Layout />
      </Router>
    </ThemeProvider>
  </Store>
);

export default App;
