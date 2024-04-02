import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel
} from '@mui/material';
import { useField, useFormikContext } from 'formik';
import Switch from '@mui/material/Switch';
const SwitchWrapper = ({
  name,
  label,
  legend,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = evt => {
    const { checked } = evt.target;
    setFieldValue(name, checked ? 1 : 0);
  };

  const configCheckbox = {
    ...field,
    onChange: handleChange
  };
  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <FormControl {...configFormControl}>
      <FormLabel component="legend">{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
            label={label}
          control={<Switch  checked={configCheckbox.value} {...configCheckbox} />}
        />
      </FormGroup>
    </FormControl>
  );
};

export default SwitchWrapper;