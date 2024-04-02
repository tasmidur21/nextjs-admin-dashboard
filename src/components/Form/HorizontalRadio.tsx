import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { useFormikContext } from 'formik';

const HorizontalRadio = ({ defaultValue, name, label, onChange = null, options, ...otherProps }) => {
    const { values, errors, touched, setFieldValue } = useFormikContext();
    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
        setFieldValue(name, e.target.value);
    };

    return (
        <FormControl component="fieldset" error={errors[name] && touched[name]} sx={{ width: '100%' }}>
            <FormLabel component="legend" sx={{ fontSize: 14, marginBottom: 1, color: '#000', fontWeight: 600 }}>
                {label}
            </FormLabel>
            <RadioGroup
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                name={name}
                value={values[name]}
                onChange={handleChange}
                row
            >
                {options.map(({ name, value }, index) => (
                    <FormControlLabel
                        {...otherProps}
                        key={index}
                        value={value}
                        control={<Radio size="small" />}
                        label={name}
                        labelPlacement="start"
                        sx={{ flex: 1 }}
                    />
                ))}
            </RadioGroup>
            <FormHelperText>{errors[name]}</FormHelperText>
        </FormControl>
    );
};

export default HorizontalRadio;
