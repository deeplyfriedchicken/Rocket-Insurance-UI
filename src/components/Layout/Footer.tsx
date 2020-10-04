import React from 'react';

import { Container } from '@material-ui/core'
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
    <div className={classes.root}>
      <Container>
        Footer
      </Container>
    </div>
  );
};

export default Footer;
