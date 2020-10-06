import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { Container, Typography } from '@material-ui/core';

import Heading from '../Common/Heading';

import NameForm from './NameForm/NameForm';
import AddressForm from './AddressForm/AddressForm';

import galaxyImage from '../../assets/galaxy.png';

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
  }),
);

const RatingsPage: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const [page, setPage] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  return (
    <div className={classes.root} style={{ overflow: isTransitioning ? 'hidden' : undefined }}>
      <Container maxWidth="md">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={page}
            timeout={800}
            nodeRef={nodeRef}
            onEntered={(): void => setIsTransitioning(false)}
            onExit={(): void => setIsTransitioning(true)}
            classNames="fade"
          >
            <div ref={nodeRef} className={page !== 0 ? "up" : "down"}>
              {page === 0 ? (
                <>
                  <Heading text="Rocket Insurance" />
                  <Typography className={classes.subtitle} variant="subtitle1">
                    Get interstellar insurance prices in minutes.
                  </Typography>
                  <Typography className={classes.paragraph} variant="subtitle2">
                    We&apos;ll just need a bit more information to get started.
                  </Typography>
                  <NameForm onSubmit={(): void => setPage(1)} />
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
                  <AddressForm
                    onSubmit={(): void => history.push('/quote')}
                    handleBack={(): void => setPage(0)}
                  />
                </>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </Container>
    </div>
  );
};

export default RatingsPage;
