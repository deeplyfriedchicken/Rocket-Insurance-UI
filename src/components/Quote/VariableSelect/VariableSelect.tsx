/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

interface Props {
  name: string;
  labelText: string;
  onChange(v: number): void | Promise<void>;
  options: number[];
  value: number;
}

const useStyles = makeStyles((theme: Theme) => {
  const spaceMono = '"Space Mono", Helvetica, sans-serif';
  return {
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
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
  };
});

const VariableSelect: React.FC<Props> = ({ name, labelText, onChange, value, options = [] }) => {
  const classes = useStyles();
  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel className={classes.label} id="deductible-label">{labelText}</InputLabel>
      <Select
        className={classes.select}
        labelId={`${name}-label`}
        id={name}
        value={value}
        MenuProps={{
          className: classes.menu,
        }}
        onChange={(e): Promise<void> | void => onChange(Number(e.target.value))}
      >
        {options.map((v) => (
          <MenuItem
            key={v}
            value={v}
          >
            {`$${Number(v).toLocaleString('en')}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default VariableSelect;
