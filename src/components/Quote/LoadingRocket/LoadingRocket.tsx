import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { Backdrop } from '@material-ui/core';
import Lottie from 'lottie-react-web'

import rocketLoading from '../../../assets/rocket-loading.json';

interface Props {
  loading: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  rocketBackdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgba(33, 36, 70, 0.5)',
    opacity: 0.5,
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      zIndex: 2000,
    }
  },
}));

const LoadingRocket: React.FC<Props> = ({ loading }) => {
  const classes = useStyles();
  return(
    <>
      <Backdrop className={classes.rocketBackdrop} open={loading}>
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
    </Backdrop>
    </>
  );
};

export default LoadingRocket;
