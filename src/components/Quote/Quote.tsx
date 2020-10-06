/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import { useHistory } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { Container, Typography, Grid } from '@material-ui/core';
import Lottie from 'lottie-react-web';

import { initialState, Context } from '../../store/Store';
import { UPDATE_QUOTE, UPDATE_PREMIUM_LOADING, VariableSelections, Quote } from '../../store/types';

import ContainerLayout from '../Layout/ContainerLayout';
import VariableSelect from './VariableSelect/VariableSelect';
import Premium from './Premium/Premium';
import LoadingRocket from './LoadingRocket/LoadingRocket';
import LiftOffRocket from './LiftOffRocket/LiftOffRocket';

import travelingRocket from '../../assets/rocket-thru-space.json';

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
    welcome: {
      marginTop: '4rem',
    },
    selectContainer: {
      alignItems: 'center',
    },
    and: {
      fontSize: '36px',
      fontFamily: spaceMono,
    },
  };
});

const QuotePage: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  const classes = useStyles({ loading });

  const { state: { premiumLoading, ratings, quote, quote: { quoteId } }, dispatch } = React.useContext(Context);
  const { deductible, asteroid_collision: asteroidCollision } = quote.variable_options || {};
  const { variable_selections: selections } = quote;

  const retrieveQuote = async (): Promise<Quote | undefined> => {
    const newQuote = await api.createQuote(ratings);
    if (newQuote) dispatch({ type: UPDATE_QUOTE, payload: newQuote });
    return newQuote;
  }

  const updateQuote = async (selections: VariableSelections): Promise<Quote | undefined> => {
    dispatch({ type: UPDATE_PREMIUM_LOADING, payload: true });
    const data = {
      quoteId,
      policy_holder: quote.policy_holder,
      rating_address: quote.rating_address,
      variable_selections: selections
    };
    const newQuote = await api.updateQuote(data);
    if (newQuote) {
      dispatch({ type: UPDATE_QUOTE, payload: newQuote });
      setTimeout(() => {
        dispatch({ type: UPDATE_PREMIUM_LOADING, payload: false });
      }, 1500);
    }
    return newQuote;
  }

  React.useEffect(() => {
    // redirect if form not filled out
    if (ratings === initialState.ratings) return history.push('/');
    retrieveQuote();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, [loading]);

  return (
    <div className={classes.root}>
      <LiftOffRocket loading={loading} />
      <LoadingRocket loading={premiumLoading} />
      {!loading ? (
        <Container style={{ visibility: loading ? 'hidden' : 'inherit' }} maxWidth="md">
          <ContainerLayout
            className={classes.welcome}
            heading={`Welcome aboard, ${ratings.firstName}`}
            subtitle="You&apos;re on your way to better, customized insurance."
            paragraph="Update the deductible and collision to get a new premium."
          >
            <Grid container spacing={3}>
              <Grid item sm={9}>
                <Grid container className={classes.selectContainer}>
                  <Grid item sm={4}>
                    <VariableSelect
                      name="deductible"
                      labelText="Deductible"
                      value={selections.deductible}
                      options={deductible?.values}
                      onChange={async (newDeductible): Promise<void> => {
                        updateQuote({ deductible: Number(newDeductible), asteroid_collision: selections.asteroid_collision });
                      }}
                    />
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
                    <VariableSelect
                      name="asteroid-collision"
                      labelText="Asteroid Collision"
                      value={selections.asteroid_collision}
                      options={asteroidCollision?.values}
                      onChange={async (newCollision): Promise<void> => {
                        updateQuote({ deductible: selections.deductible, asteroid_collision: Number(newCollision) });
                      }}
                    />
                  </Grid>
                </Grid>
                <Premium premium={quote?.premium} />
              </Grid>
              <Grid item sm={3}>
                <Lottie
                  options={{
                    animationData: travelingRocket,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice',
                    },
                  }}
                  height={400}
                  width={400}
                  speed={0.5}
                  isStopped={false}
                  isPaused={false}
                />
              </Grid>
            </Grid>
          </ContainerLayout>
        </Container>
      ): null}
    </div>
  );
};

export default QuotePage;
