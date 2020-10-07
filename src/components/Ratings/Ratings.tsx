import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { Container } from '@material-ui/core';

import ContainerLayout from '../Layout/ContainerLayout';
import ParticlesBackground from '../Common/ParticlesBackground';
import { Context } from '../../store/Store';
import { UPDATE_QUOTE, RESET, Quote } from '../../store/types';

import NameForm from './NameForm/NameForm';
import AddressForm from './AddressForm/AddressForm';

import api from '../../api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      background: `${theme.palette.primary.light}`,
      backgroundSize: '1000px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      '& #tsparticles': {
        zIndex: 1,
      },
      '& > .MuiContainer-root': {
        zIndex: 2,
      },
    },
  }),
);

const RatingsPage: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const [page, setPage] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const { state: { ratings }, dispatch } = React.useContext(Context);

  const retrieveQuote = async (): Promise<Quote | undefined> => {
    const newQuote = await api.createQuote(ratings);
    if (newQuote) dispatch({ type: UPDATE_QUOTE, payload: newQuote });
    return newQuote;
  }

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
                      onSubmit={async (): Promise<void> => {
                        await retrieveQuote();
                        history.push('/quote')
                      }}
                      handleBack={(): void => setPage(0)}
                      handleReset={(): void => {
                        dispatch({ type: RESET })
                        history.push('/');
                        setPage(0);
                      }}
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
