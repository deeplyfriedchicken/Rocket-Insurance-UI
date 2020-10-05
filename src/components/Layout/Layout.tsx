import React from 'react';

import Header from './Header';
import Footer from './Footer';
import RouteNode from '../RouteNode/RouteNode';

import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateRows: '64px auto 75px',
      gridTemplateAreas: `
        "header"
        "main"
        "footer"
      `,
      minHeight: '100vh',
    },
    container: {
      gridArea: 'main',
    }
  }),
);

const Layout: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.container}>
        <RouteNode />
      </div>
      <Footer />
    </div>
  )
};

export default Layout;
