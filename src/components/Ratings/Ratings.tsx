import React from 'react';

import galaxyImage from '../../assets/galaxy.png';

import { Container, Typography } from '@material-ui/core';

import Heading from '../Common/Heading';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      background: `url(${galaxyImage}), ${theme.palette.primary.light}`,
      backgroundSize: '1000px',
      display: 'flex',
      alignItems: 'center',
    },
    subtitle: {
      color: theme.palette.primary.contrastText,
      fontWeight: 500,
      fontSize: '32px',
      marginBottom: '16px',
    },
    paragraph: {
      color: theme.palette.primary.contrastText,
      fontSize: '18px',
      marginBottom: '16px',
    }
  }),
);

const Ratings: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Heading text="Rocket Insurance" />
        <Typography className={classes.subtitle} variant="subtitle1">
          Get interstellar insurance prices in minutes.
        </Typography>
        <Typography className={classes.paragraph} variant="subtitle2">
          We&apos;ll just need a bit more information to get started.
        </Typography>
      </Container>
    </div>
  );
};

export default Ratings;
