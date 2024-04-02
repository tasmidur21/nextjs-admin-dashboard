import React, { useEffect, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import moment from 'moment';

const DATE_PICKER_TYPE_DEFAULT = 'default';
const DATE_PICKER_TYPE_MOBILE = 'mobile';
const DATE_PICKER_TYPE_DESKTOP = 'desktop';
const DATE_PICKER_TYPE_STATIC = 'staticDatePicker';
const DEFAULT_INPUT_FORMAT = 'YYYY-MM-DD';
const DatePickerField = ({ name, label, onChange = null, datePickerType = DATE_PICKER_TYPE_DEFAULT, ...otherProps }) => {
    const [value, setValue] = useState(otherProps.value ?? null);
    const [inputFormat, setInputFormat] = useState(otherProps.inputFormat ?? DEFAULT_INPUT_FORMAT);
    const { setFieldValue } = useFormikContext();
    const [field, mata] = useField(name);
    const [open, setOpen] = useState(false);

    const configDatepicker = {
        ...field,
        ...otherProps,
        variant: 'outlined',
        fullWidth: true,
        name: name,
        error: false,
        InputLabelProps: {
            shrink: true
        }
    };

    if (mata && mata.touched && mata.error) {
        configDatepicker.error = true;
        configDatepicker.helperText = mata.error;
    }

    const handleDateChange = (date) => {
        setValue(date);
        setFieldValue(name, moment(date?.$d).format(inputFormat));

        if (onChange) {
            onChange(date);
        }
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
                <>
                    {datePickerType === DATE_PICKER_TYPE_DEFAULT && (
                        <DatePicker
                            label={label}
                            value={value ?? field?.value}
                            onChange={handleDateChange}
                            {...otherProps}
                            open={open}
                            onOpen={() => setOpen(true)}
                            onClose={() => setOpen(false)}
                            renderInput={(params) => (
                                <TextField {...params} {...configDatepicker} autoComplete="off" onClick={(e) => setOpen(true)} />
                            )}
                        />
                    )}
                    {datePickerType === DATE_PICKER_TYPE_MOBILE && (
                        <MobileDatePicker
                            label={label}
                            value={value}
                            onChange={handleDateChange}
                            {...otherProps}
                            renderInput={(params) => <TextField {...params} {...configDatepicker} />}
                        />
                    )}
                    {datePickerType === DATE_PICKER_TYPE_DESKTOP && (
                        <DesktopDatePicker
                            label={label}
                            value={value}
                            onChange={handleDateChange}
                            {...otherProps}
                            renderInput={(params) => <TextField {...params} {...configDatepicker} />}
                        />
                    )}
                    {datePickerType === DATE_PICKER_TYPE_STATIC && (
                        <StaticDatePicker
                            label={label}
                            value={value}
                            onChange={handleDateChange}
                            {...otherProps}
                            renderInput={(params) => <TextField {...params} {...configDatepicker} />}
                        />
                    )}
                </>
            </Stack>
        </LocalizationProvider>
    );
};

export default DatePickerField;
