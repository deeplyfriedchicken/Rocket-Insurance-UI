import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Heading from '../Common/Heading';

interface Props {
  className?: string;
  heading: string;
  subtitle: string;
  paragraph: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    },
  }),
);

const ContainerLayout: React.FC<Props> = ({ className, heading, subtitle, paragraph, children }) => {
  const classes = useStyles();

  return (
    <div className={className}>
      <Heading text={heading} />
      <Typography className={classes.subtitle} variant="subtitle1">
        {subtitle}
      </Typography>
      <Typography className={classes.paragraph} variant="subtitle2">
        {paragraph}
      </Typography>
      {children}
    </div>
  );
};

export default ContainerLayout;
