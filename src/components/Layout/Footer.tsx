import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      gridArea: "footer",
      backgroundColor: theme.palette.primary.main,
    },
  }),
);

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} />
  );
};

export default Footer;
