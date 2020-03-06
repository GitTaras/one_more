import { TextField } from '@material-ui/core';
import React from 'react';

export default ({ field, form: { touched, errors }, ...props }) => (
  <TextField
    {...field}
    {...props}
    error={touched[field.name] && errors[field.name]}
    helperText={errors[field.name]}
  />
)
