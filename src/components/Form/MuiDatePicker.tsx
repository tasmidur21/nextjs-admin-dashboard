import React, { useEffect, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const MuiDatePicker = ({ name, label, onChange = null, disableFuture = false, inputFormat = 'YYYY-MM-DD', ...otherProps }) => {
    const [value, setValue] = useState(null);
    const { setFieldValue } = useFormikContext();
    const [field, mata] = useField(name);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (field.value) {
            setValue(field.value);
        }
    }, [field.value]);

    const configDatepicker = {
        ...field,
        ...otherProps,
        variant: 'outlined',
        fullWidth: true,
        name: name,
        InputLabelProps: {
            shrink: true
        }
    };

    if (mata && mata.touched && mata.error) {
        configDatepicker.error = true;
        configDatepicker.helperText = mata.error;
    }

    const handleDateChange = (date) => {
        if (onChange) {
            onChange(date);
        }
        setFieldValue(name, date);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
                <DesktopDatePicker
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    label={label}
                    inputFormat={inputFormat}
                    {...otherProps}
                    value={value}
                    disabled={otherProps.disabled}
                    disableFuture={disableFuture}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField onClick={(e) => setOpen(true)} {...params} {...configDatepicker} />}
                />
            </Stack>
        </LocalizationProvider>
    );
};

export default MuiDatePicker;
