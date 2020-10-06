/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import { Controller, Control } from 'react-hook-form';
import { InputAdornment,  TextField } from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';


interface Props {
  control: Control<Record<string, any>>;
  trigger?(payload?: string | string[]): Promise<boolean>;
  defaultValue: any;
  label: string;
  name: string;
  rules?: Record<string, any>;
  handleChange?(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void | undefined;
  error?: Record<string, any>;
  autoFocus?: boolean;
  inputRef?: React.Ref<HTMLDivElement>;
}

const useStyles = makeStyles(() =>
  createStyles({
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

const ControlledTextInput: React.FC<Props> = ({
    handleChange, trigger,
    autoFocus, label, control,
    inputRef, name, defaultValue, rules, error
  }) => {
  const classes = useStyles();
  const [hasTriggered, setHasTriggered] = React.useState(false);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ onChange, onBlur, name, value }): React.ReactElement => (
        <TextField
          fullWidth
          name={name}
          autoFocus={autoFocus}
          inputRef={inputRef}
          variant="filled"
          label={label}
          error={!!error}
          helperText={error?.message}
          className={classes.textField}
          onChange={(e): void => {
            if (handleChange) handleChange(e);
            onChange(e)
          }}
          onBlur={(): void => {
            if (trigger) {
              trigger(name);
              setHasTriggered(true);
            }
            onBlur();
          }}
          value={value}
          InputProps={{
            endAdornment: (
              (!trigger || hasTriggered) && value && !error ? (
                <InputAdornment position="end">
                    <CheckCircleIcon color="secondary" />
                </InputAdornment>
              ) : null
            )
          }}
        />
      )}
    />
  )
}

export default ControlledTextInput;
