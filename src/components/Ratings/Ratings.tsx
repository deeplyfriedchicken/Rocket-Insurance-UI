import React from 'react';

import galaxyImage from '../../assets/galaxy.png';

import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';

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
    },
    formContainer: {
      marginBottom: '16px',
    },
    textField: {
      backgroundColor: 'white',
      '&:focused': {
        backgroundColor: 'white',
      }
    },
  }),
);

const Ratings: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={page}
            addEndListener={(node, done): void => {
              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade"
          >
            <div className={page === 0 ? "up" : "down"}>
              {page === 0 ? (
                <>
                  <Heading text="Rocket Insurance" />
                  <Typography className={classes.subtitle} variant="subtitle1">
                    Get interstellar insurance prices in minutes.
                  </Typography>
                  <Typography className={classes.paragraph} variant="subtitle2">
                    We&apos;ll just need a bit more information to get started.
                  </Typography>
                  <Grid className={classes.formContainer} container spacing={3}>
                    <Grid item sm={6}>
                      <TextField className={classes.textField} fullWidth label="First Name" variant="filled" />
                    </Grid>
                    <Grid item sm={6}>
                      <TextField className={classes.textField} fullWidth label="Last Name" variant="filled" />
                    </Grid>
                  </Grid>
                  <Button color="secondary" variant="contained" onClick={(): void => setPage(1)}>NEXT</Button>
                </>
              ) : (
                <>
                  <Heading text="Get Your Boarding Pass:" />
                  <Typography className={classes.subtitle} variant="subtitle1">
                    Almost there!
                  </Typography>
                  <Typography className={classes.paragraph} variant="subtitle2">
                    You&apos;ll be able to customize your deductible and asteroid collision after receiving your initial quote!
                  </Typography>
                  <Grid className={classes.formContainer} container spacing={3}>
                    <Grid item sm={7}>
                      <TextField className={classes.textField} fullWidth label="Address" variant="filled" />
                    </Grid>
                    <Grid item sm={5}>
                      <TextField className={classes.textField} fullWidth label="Apt #" variant="filled" />
                    </Grid>
                    <Grid item sm={4}>
                      <TextField className={classes.textField} fullWidth label="City" variant="filled" />
                    </Grid>
                    <Grid item sm={4}>
                      <TextField className={classes.textField} fullWidth label="Region" variant="filled" />
                    </Grid>
                    <Grid item sm={4}>
                      <TextField className={classes.textField}fullWidth label="Postal" variant="filled" />
                    </Grid>
                  </Grid>
                  <Button color="secondary" variant="contained" onClick={(): void => setPage(0)}>BACK</Button>
                </>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </Container>
    </div>
  );
};

export default Ratings;
