import React from 'react';
import {TextField} from '@mui/material';
import { useField, useFormikContext } from 'formik';

const DateTimePicker = ({
  name,
  onChange=null,
  ...otherProps
}) => {
  const [ field, meta ] = useField(name);
  const { setFieldValue } = useFormikContext();

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: 'date',
    variant: 'outlined',
    fullWidth: true,
    InputLabelProps: {
      shrink: true
    }
  };

  const handleChange = (e) => {
    if(onChange){
      onChange(e);
    }
    setFieldValue(name, e.target.value);
  }

  if(meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return (
    <TextField
      {...configDateTimePicker}
      onChange={handleChange}
    />
  );
};

export default DateTimePicker;