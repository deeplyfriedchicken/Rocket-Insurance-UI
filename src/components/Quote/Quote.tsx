import React from 'react';

import { Backdrop } from '@material-ui/core';
import Lottie from 'lottie-react-web'

import rocket from '../../assets/rocket-launch-transparent.json';

import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#09151d',
    alignItems: 'baseline',
  },
  lottieContainer: {
    height: '100%',
    width: '100%',
  },
}));

const Quote: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const classes = useStyles();

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [loading]);

  return (
    <>
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
        </div>
      </Backdrop>
      <div>Quote</div>
    </>
  );
};

export default Quote;
