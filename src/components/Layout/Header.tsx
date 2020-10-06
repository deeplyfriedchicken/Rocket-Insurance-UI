import React from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';

import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      gridArea: "header",
      '& a': {
        textDecoration: 'none',
        color: 'inherit',
      }
    }
  }),
);

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <Link to="/">
              <Typography variant="h6">🚀 Rocket Insurance</Typography>
            </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
