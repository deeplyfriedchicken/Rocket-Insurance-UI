import React from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core'

import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      gridArea: "header",
    }
  }),
);

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">🚀 Rocket Insurance</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
