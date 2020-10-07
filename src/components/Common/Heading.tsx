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
      lineHeight: '72px',
      fontWeight: 900,
      [theme.breakpoints.down('xs')]: {
        fontSize: '3rem',
        wordBreak: 'break-word',
      }
    },
  }),
);

interface Props {
  text: string;
  className?: string;
}

const Heading: React.FC<Props> = ({ text, className }) => {
  const classes = useStyles();

  return (
    <Typography
      className={`${className} ${classes.root}`}
      variant="h2"
    >
      {text}
    </Typography>
  )

}
export default Heading;
