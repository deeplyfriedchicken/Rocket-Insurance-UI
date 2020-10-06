/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import { useHistory } from 'react-router-dom';
import { Backdrop, Container, FormControl, InputLabel, MenuItem, Select, Slide, Typography, Grid } from '@material-ui/core';
import Lottie from 'lottie-react-web'

import Heading from '../Common/Heading';
import rocket from '../../assets/rocket-launch-transparent.json';
import travelingRocket from '../../assets/rocket-thru-space.json';
import rocketLoading from '../../assets/rocket-loading.json';

import { makeStyles, Theme } from '@material-ui/core/styles';

import { initialState, Context } from '../../store/Store';
import { UPDATE_QUOTE, VariableSelections, Quote, UPDATE_PREMIUM_LOADING } from '../../store/types';
import api from '../../api';

const useStyles = makeStyles((theme: Theme) => {
  const spaceMono = '"Space Mono", Helvetica, sans-serif';
  return {
    root: {
      overflow: 'hidden',
      height: '100%',
      backgroundColor: theme.palette.primary.light,
      display: 'flex',
      alignItems: 'center',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: '#09151d',
      alignItems: 'baseline',
    },
    lottieContainer: {
      height: '100%',
      width: '100%',
      textAlign: 'center',
    },
    loadingText: {
      fontFamily: spaceMono,
      fontWeight: 600,
      fontSize: '32px',
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
    label: {
      fontSize: '18px',
      '&.Mui-focused': {
        color: theme.palette.text.secondary,
      },
    },
    select: {
      fontFamily: spaceMono,
      fontSize: '35px',
      color: '#CB9E2D',
    },
    menu: {
      '& .MuiMenu-paper': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    selectContainer: {
      alignItems: 'center',
    },
    and: {
      fontSize: '36px',
      fontFamily: spaceMono,
    },
    premium: {
      fontFamily: spaceMono,
      fontSize: '96px',
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
    welcome: {
      marginTop: '4rem',
    },
  };
});

const QuotePage: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  const { state: { ratings, quote, quote: { quoteId }, premiumLoading }, dispatch } = React.useContext(Context);
  const classes = useStyles({ loading });

  const retrieveQuote = async (): Promise<Quote | undefined> => {
    const newQuote = await api.createQuote(ratings);
    console.log(newQuote);
    if (newQuote) {
      dispatch({ type: UPDATE_QUOTE, payload: newQuote });
    }
    return newQuote;
  }

  const updateQuote = async (selections: VariableSelections): Promise<Quote | undefined> => {
    const data = { quoteId, policy_holder: quote.policy_holder, rating_address: quote.rating_address, variable_selections: selections };
    dispatch({ type: UPDATE_PREMIUM_LOADING, payload: true });
    const newQuote = await api.updateQuote(data);
    console.log(newQuote);
    if (newQuote) {
      dispatch({ type: UPDATE_QUOTE, payload: newQuote });
      setTimeout(() => {
        dispatch({ type: UPDATE_PREMIUM_LOADING, payload: false });
      }, 1000);
    }
    return newQuote;
  }

  React.useEffect(() => {
    if (ratings === initialState.ratings) return history.push('/');
    retrieveQuote();
  }, []);

  const { deductible, asteroid_collision: asteroidCollision } = quote.variable_options;

  const { variable_selections: selections } = quote;

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, [loading]);

  return (
    <div className={classes.root}>
      <Slide
        direction="down"
        in={loading}
        unmountOnExit
      >
        <Backdrop
          open
          transitionDuration={{
            appear: 0,
            enter: 500,
            exit: 500,
          }}
          className={classes.backdrop}
        >
          <div className={classes.lottieContainer}>
            <Lottie
              options={{
                animationData: rocket,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              height={600}
              width={600}
              isStopped={false}
              isPaused={false}
            />
            <Typography
              className={classes.loadingText}
              color="textPrimary"
              variant="h1"
            >
                performing final checks...
              </Typography>
          </div>
        </Backdrop>
      </Slide>
      {!loading ? (
        <Container style={{ visibility: loading ? 'hidden' : 'inherit' }} maxWidth="md">
          <Heading className={classes.welcome} text="Welcome aboard, Kevin" />
          <Typography className={classes.subtitle} variant="subtitle1">
            You&apos;re on your way to better, customized insurance.
          </Typography>
          <Typography className={classes.paragraph} variant="subtitle2">
            Update the deductible and collision to get a new premium.
          </Typography>
          <Grid container spacing={3}>
            <Grid item sm={9}>
              <Grid container className={classes.selectContainer}>
                <Grid item sm={4}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel className={classes.label} id="deductible-label">Deductible</InputLabel>
                    <Select
                      className={classes.select}
                      labelId="deductible-label"
                      id="deductible-label"
                      value={selections.deductible}
                      MenuProps={{
                        className: classes.menu,
                      }}
                      onChange={async (e): Promise<Quote | undefined> => {
                        return updateQuote({ deductible: Number(e.target.value), asteroid_collision: selections.asteroid_collision });
                      }}
                    >
                      {(deductible?.values || []).map((d) => (
                        <MenuItem
                          key={d}
                          value={d}
                        >
                          {d}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={2}>
                  <Typography
                    className={classes.and}
                    variant="subtitle1"
                    color="textPrimary"
                  >
                    and
                  </Typography>
                </Grid>
                <Grid item sm={4}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel className={classes.label} id="asteroid-collision-label">Asteroid Collision</InputLabel>
                    <Select
                      labelId="asteroid-collision-label"
                      id="asteroid-collision"
                      value={selections.asteroid_collision}
                      className={classes.select}
                      MenuProps={{
                        className: classes.menu,
                      }}
                      onChange={async (e): Promise<Quote | undefined> => {
                        return updateQuote({ deductible: selections.deductible, asteroid_collision: Number(e.target.value) });
                      }}
                    >
                      {(asteroidCollision?.values || []).map((collision) => (
                        <MenuItem
                          key={collision}
                          value={collision}
                        >
                          {collision}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              {!premiumLoading ? (
                <>
                  <Typography variant="h2" className={classes.premium}>{`$${quote?.premium}`} <span>/ yr</span></Typography>
                  <Typography
                    variant="subtitle1"
                    color="textPrimary"
                    className={classes.premiumSubtitle}
                  >
                    premium
                  </Typography>
                </>
              ) : (
                <Lottie
                  options={{
                    animationData: rocketLoading,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice',
                    },
                  }}
                  height={300}
                  width={300}
                  speed={1.5}
                  isStopped={false}
                  isPaused={false}
                />
              )}
            </Grid>
            <Grid item sm={3}>
              <Lottie
                options={{
                  animationData: travelingRocket,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                  },
                }}
                height={600}
                width={600}
                speed={0.5}
                isStopped={false}
                isPaused={false}
              />
            </Grid>
          </Grid>
        </Container>
      ): null}
    </div>
  );
};

export default QuotePage;
