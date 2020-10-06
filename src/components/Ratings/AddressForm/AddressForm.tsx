import React from 'react'

import { UPDATE_RATINGS } from '../../../store/types';

import { Button, Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { Context } from '../../../store/Store';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import ControlledTextInput from '../../Common/ControlledTextInput';

const useStyles = makeStyles(() =>
  createStyles({
    buttonContainer: {
      '& button': {
        margin: '12px',
      },
    },
    rightButtonContainer: {
      textAlign: 'right',
    },
    formContainer: {
      marginBottom: '16px',
    },
  }),
);

interface Props {
  onSubmit(): void;
  handleBack(): void;
}

const AddressForm: React.FC<Props> = ({ handleBack, onSubmit }) => {
  const { state: { ratings }, dispatch } = React.useContext(Context);
  const { address } = ratings;
  const { handleSubmit, errors, control } = useForm({ defaultValues: { ...address }, shouldUnregister: false });
  const classes = useStyles();

  return (
    <form
      onSubmit={handleSubmit(() => {
        onSubmit();
      })}
    >
      <Grid className={classes.formContainer} container spacing={3}>
        <Grid item sm={7}>
          <ControlledTextInput
            control={control}
            defaultValue={address.line1}
            error={errors?.line1}
            handleChange={(e): void => dispatch({ type: UPDATE_RATINGS, payload: { ...ratings, address: { ...address, line1: e.target.value }} })}
            label="Address"
            name="line1"
            rules={{ required: "This field is required" }}
          />
        </Grid>
        <Grid item sm={5}>
          <ControlledTextInput
            control={control}
            defaultValue={address.line2}
            error={errors?.line2}
            handleChange={(e): void => dispatch({ type: UPDATE_RATINGS, payload: { ...ratings, address: { ...address, line2: e.target.value }} })}
            label="Apt #"
            name="line2"
          />
        </Grid>
        <Grid item sm={4}>
          <ControlledTextInput
            control={control}
            defaultValue={address.city}
            error={errors?.city}
            handleChange={(e): void => dispatch({ type: UPDATE_RATINGS, payload: { ...ratings, address: { ...address, city: e.target.value }} })}
            label="City"
            name="city"
            rules={{ required: "This field is required" }}
          />
        </Grid>
        <Grid item sm={4}>
          <ControlledTextInput
            control={control}
            defaultValue={address.region}
            error={errors?.region}
            handleChange={(e): void => dispatch({ type: UPDATE_RATINGS, payload: { ...ratings, address: { ...address, region: e.target.value }} })}
            label="Region"
            name="region"
            rules={{ required: "This field is required" }}
          />
        </Grid>
        <Grid item sm={4}>
          <ControlledTextInput
            control={control}
            defaultValue={address.postal}
            error={errors?.postal}
            handleChange={(e): void => dispatch({ type: UPDATE_RATINGS, payload: { ...ratings, address: { ...address, postal: e.target.value }} })}
            label="Postal"
            name="postal"
            rules={{ required: "This field is required" }}
          />
        </Grid>
        <Grid container spacing={3}>
          <Grid className={classes.buttonContainer} item sm={2}>
            <Button color="secondary" variant="contained" type="button" onClick={handleBack}>BACK</Button>
          </Grid>
          <Grid className={`${classes.rightButtonContainer} ${classes.buttonContainer}`} item sm={10}>
            <Button variant="contained" type="button">Reset</Button>
            <Button color="primary" variant="contained" type="submit">Submit</Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddressForm;
