import React from 'react';

import { Typography } from '@material-ui/core';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: '"Space Mono", sans-serif',
      fontSize: '72px',
      color: theme.palette.primary.contrastText,
      marginBottom: '16px',
    },
  }),
);

interface Props {
  text: string;
}

const Heading: React.FC<Props> = ({ text }) => {
  const classes = useStyles();

  return (
    <Typography className={classes.root} variant="h2">
      {text}
    </Typography>
  )

}
export default Heading;
