import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Backdrop, Container, Slide, Typography } from '@material-ui/core';
import Lottie from 'lottie-react-web';

import rocket from '../../../assets/rocket-launch-transparent.json';

interface Props {
  loading: boolean;
}

const useStyles = makeStyles((theme: Theme) => {
  const spaceMono = '"Space Mono", Helvetica, sans-serif';
  return {
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: '#09151d',
      alignItems: 'baseline',
    },
    loadingText: {
      fontFamily: spaceMono,
      fontWeight: 600,
      fontSize: '32px',
    },
    lottieContainer: {
      height: '100%',
      width: '100%',
      textAlign: 'center',
    },
  };
});

const LiftOffRocket: React.FC<Props> = ({ loading }) => {
  const classes = useStyles();

  const theme = useTheme();
  // add breakpoint check to change lottie fixed width on smaller browsers
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  return (
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
            width={matches ? 300 : 600}
            isStopped={false}
            isPaused={false}
          />
          <Container>
            <Typography
              className={classes.loadingText}
              color="textPrimary"
              variant="h1"
            >
              performing final checks...
            </Typography>
          </Container>
        </div>
      </Backdrop>
    </Slide>
  );
};

export default LiftOffRocket;
