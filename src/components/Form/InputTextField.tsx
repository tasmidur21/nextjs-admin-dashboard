
import React, { memo, useMemo } from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';
const InputTextFieldWrapper = memo(({ name, ...otherProps}) => {
  const [field, mata] = useField(name);
  const configTextfield = useMemo(() => {
    const config = {
      ...field,
      ...otherProps,
      fullWidth: true,
      variant: 'outlined',
      InputLabelProps: {
       shrink: true
      }
    };

    if (mata && mata.touched && mata.error) {
      config.error = true;
      config.helperText = mata.error;
    }

    return config;
  }, [field, mata, otherProps]);

  return (
      <>
        <TextField type={'number'} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} {...configTextfield} />
      </>

  );
});

export default InputTextFieldWrapper;
