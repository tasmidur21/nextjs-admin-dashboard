import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const SelectWrapper = ({ name, options, handleOptionChange = null, ...otherProps }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = (evt) => {
        const { value } = evt.target;
        setFieldValue(name, value);
        if (handleOptionChange) {
            handleOptionChange(evt);
        }
    };

    const configSelect = {
        ...field,
        ...otherProps,
        select: true,
        variant: 'outlined',
        fullWidth: true,
        InputLabelProps: {
            shrink: true
        },
        onChange: handleChange,
        defaultValue: ''
    };

    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }

    return (
        <TextField {...configSelect}>
            {options.map(({ name, value, color }, index) => {
                return (
                    <MenuItem key={index} value={value} sx={{ color: color ?? 'unset' }}>
                        {name}
                    </MenuItem>
                );
            })}
        </TextField>
    );
};

export default SelectWrapper;
