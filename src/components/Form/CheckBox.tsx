import React from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const CheckboxWrapper = ({ name, label, legend, ...otherProps }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = (evt) => {
        const { checked } = evt.target;
        setFieldValue(name, checked);
    };

    const configCheckbox = {
        ...field,
        checked: Boolean(field.value),
        onChange: handleChange,
        ...otherProps
    };

    const configFormControl:any = {};

    if (meta && meta.touched && meta.error) {
        configFormControl.error = true;
    }

    return (
        <FormControl {...configFormControl}>
            <FormLabel component="legend">{legend}</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            {...configCheckbox}
                            sx={{ mt: -0.2, transition: 'all 0.4s ease-in-out', '&.Mui-disabled': { transition: 'all 0.4s ease-in-out' } }}
                        />
                    }
                    label={label}
                />
            </FormGroup>
        </FormControl>
    );
};

export default CheckboxWrapper;
