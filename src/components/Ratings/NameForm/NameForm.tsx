import React from 'react';
import { UPDATE_RATINGS } from '../../../store/types';

import { useForm } from 'react-hook-form';
import { Button, Grid } from '@material-ui/core';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Context } from '../../../store/Store';
import ControlledTextInput from '../../Common/ControlledTextInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    formContainer: {
      marginBottom: '16px',
    },
    textField: {
      '& .MuiFilledInput-input': {
        color: '#000',
      },
      '& .MuiFilledInput-root': {
        backgroundColor: 'white',
        '&:focused': {
          backgroundColor: 'white',
        }
      },
      '& .MuiFormHelperText-root': {
        fontWeight: 600,
      },
    },
  }),
);

interface Props {
  onSubmit(): void;
}

const NameForm: React.FC<Props> = ({ onSubmit }) => {
  const classes = useStyles();
  const { state: { ratings }, dispatch } = React.useContext(Context);
  const { firstName, lastName } = ratings;
  const { handleSubmit, errors, trigger, control } = useForm({ defaultValues: { firstName, lastName }, shouldUnregister: false });

  return (
    <form
      onSubmit={handleSubmit(() => {
        onSubmit();
      })}
    >
      <Grid className={classes.formContainer} container spacing={3}>
        <Grid item sm={6}>
          <ControlledTextInput
            autoFocus
            control={control}
            trigger={trigger}
            defaultValue={firstName}
            error={errors?.firstName}
            handleChange={(e): void => dispatch({ type: UPDATE_RATINGS, payload: { ...ratings, firstName: e.target.value }})}
            label="First Name"
            name="firstName"
            rules={{ required: "This field is required" }}
          />
        </Grid>
        <Grid item sm={6}>
          <ControlledTextInput
            control={control}
            trigger={trigger}
            defaultValue={lastName}
            error={errors?.lastName}
            handleChange={(e): void => dispatch({ type: UPDATE_RATINGS, payload: { ...ratings, lastName: e.target.value }})}
            label="Last Name"
            name="lastName"
            rules={{ required: "This field is required" }}
          />
        </Grid>
      </Grid>
      <Button
        color="secondary"
        variant="contained"
        type="submit"
      >
          NEXT
        </Button>
    </form>
  )
};

export default NameForm;
