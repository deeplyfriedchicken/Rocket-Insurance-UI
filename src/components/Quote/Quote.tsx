import React from 'react';

import { useHistory } from 'react-router-dom';
import { Backdrop, Container, FormControl, InputLabel, MenuItem, Select, Slide, Typography, Grid } from '@material-ui/core';
import Lottie from 'lottie-react-web'

import Heading from '../Common/Heading';
import rocket from '../../assets/rocket-launch-transparent.json';
import travelingRocket from '../../assets/rocket-thru-space.json';

import { makeStyles, Theme } from '@material-ui/core/styles';

import { initialState, Context } from '../../store/Store';
import { UPDATE_QUOTE, Ratings } from '../../store/types';
import { createQuote } from '../../api';

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

const Quote: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  const [selectedDeductible, setSelectedDeductible] = React.useState<number | null>(null);
  const [selectedCollision, setSelectedCollision] = React.useState<number | null>(null);
  const { state: { ratings, quote }, dispatch } = React.useContext(Context);
  const classes = useStyles({ loading });

  const retrieveQuote = async (data: Ratings): Promise<void> => {
    const newQuote = await createQuote(data);
    console.log(newQuote);
    dispatch({ type: UPDATE_QUOTE, payload: newQuote });
    setSelectedDeductible(newQuote?.variable_options.deductible.values[0] || null)
    setSelectedCollision(newQuote?.variable_options.asteroid_collision.values[0] || null)
  }

  React.useEffect(() => {
    if (ratings === initialState.ratings) return history.push('/');
    retrieveQuote(ratings);
  }, []);

  const { deductible, asteroid_collision: asteroidCollision } = quote?.variable_options || {};

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
            <Grid item sm={8}>
              <Grid container className={classes.selectContainer}>
                <Grid item sm={4}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel className={classes.label} id="deductible-label">Deductible</InputLabel>
                    <Select
                      className={classes.select}
                      labelId="deductible-label"
                      id="deductible-label"
                      value={selectedDeductible}
                      MenuProps={{
                        className: classes.menu,
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
                      value={selectedCollision}
                      className={classes.select}
                      MenuProps={{
                        className: classes.menu,
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
              <Typography variant="h2" className={classes.premium}>{`$${quote?.premium}`} <span>/ yr</span></Typography>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                className={classes.premiumSubtitle}
              >
                premium
              </Typography>
            </Grid>
            <Grid item sm={4}>
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

export default Quote;
