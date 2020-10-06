import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { Context } from '../../../store/Store';

interface Props {
  premium: number;
}

const useStyles = makeStyles((theme: Theme) => {
  const spaceMono = '"Space Mono", Helvetica, sans-serif';
  return {
    premium: {
      fontFamily: spaceMono,
      fontSize: '72px',
      color: theme.palette.secondary.main,
      '& > span': {
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.text.primary,
        fontSize: '36px',
        fontWeight: 900,
      },
    },
    premiumSubtitle: {
      fontFamily: spaceMono,
      fontSize: '48px',
    },
  };
});

const Premium: React.FC<Props> = ({ premium }) => {
  const classes = useStyles();
  const { state: { premiumLoading } } = React.useContext(Context);

  return (
    !premiumLoading ? (
      <>
        <Typography variant="h2" className={classes.premium}>
          {`$${Number(premium).toLocaleString('en')}`}
          <span>/ yr</span>
        </Typography>
        <Typography
          variant="subtitle1"
          color="textPrimary"
          className={classes.premiumSubtitle}
        >
          premium
        </Typography>
      </>
    ) : null
  );
};

export default Premium;
