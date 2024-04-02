import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { useFormikContext } from 'formik';

const VerticalRadio = ({
  name,
  label,
  options
}) => {
  const { values, errors, touched, setFieldValue } = useFormikContext();

  return (
    <FormControl component="fieldset" error={errors[name] && touched[name]}>
      <FormLabel component="legend" sx={{fontSize:  14, marginBottom: 1, color: "#000"}}>{label}</FormLabel>
      <RadioGroup
        name={name}
        value={values[name]}
        onChange={(e) => setFieldValue(name, e.target.value)}
      >
        {options.map(({name, value}, index) => (
          <FormControlLabel
            key={index}
            value={value}
            control={<Radio size="small"/>}
            label={name}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{errors[name]}</FormHelperText>
    </FormControl>
  );
};

export default VerticalRadio;
