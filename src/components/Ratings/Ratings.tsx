import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { Container } from '@material-ui/core';

import ContainerLayout from '../Layout/ContainerLayout';
import ParticlesBackground from '../Common/ParticlesBackground';

import NameForm from './NameForm/NameForm';
import AddressForm from './AddressForm/AddressForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      background: `${theme.palette.primary.light}`,
      backgroundSize: '1000px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
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
      <ParticlesBackground />
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
                <ContainerLayout
                  heading="Rocket Insurance"
                  subtitle="Get Interstellar insurance prices in minutes"
                  paragraph="We&apos;ll just need a bit more information to get started!"
                >
                  <NameForm onSubmit={(): void => setPage(1)} />
                </ContainerLayout>
              ) : (
                  <ContainerLayout
                    heading="Get Your Boarding Pass:"
                    subtitle="Almost there!"
                    paragraph="You&apos;ll be able to customize your deductible and asteroid collision after receiving your initial quote!"
                  >
                    <AddressForm
                      onSubmit={(): void => history.push('/quote')}
                      handleBack={(): void => setPage(0)}
                    />
                  </ContainerLayout>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </Container>
    </div>
  );
};

export default RatingsPage;
