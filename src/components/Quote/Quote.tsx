import React from 'react';

import { Backdrop, Container, FormControl, InputLabel, MenuItem, Select, Slide, Typography, Grid } from '@material-ui/core';
import Lottie from 'lottie-react-web'

import Heading from '../Common/Heading';
import rocket from '../../assets/rocket-launch-transparent.json';
import travelingRocket from '../../assets/rocket-thru-space.json';

import { makeStyles, Theme } from '@material-ui/core/styles';

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
  const [loading, setLoading] = React.useState(true);
  const classes = useStyles({ loading });

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
                    value={10000}
                    MenuProps={{
                      className: classes.menu,
                    }}
                  >
                    <MenuItem value={10000}>10000</MenuItem>
                    <MenuItem value={20000}>20000</MenuItem>
                    <MenuItem value={30000}>30000</MenuItem>
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
                    value={60000}
                    className={classes.select}
                    MenuProps={{
                      className: classes.menu,
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={60000}>60,000</MenuItem>
                    <MenuItem value={70000}>70,000</MenuItem>
                    <MenuItem value={10000}>10,000</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Typography variant="h2" className={classes.premium}>$6,000 <span>/ yr</span></Typography>
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
    </div>
  );
};

export default Quote;
