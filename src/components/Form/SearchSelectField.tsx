import React, { useState, useEffect, memo } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useField, useFormikContext } from 'formik';
import './style/custom.css';

const SearchSelectField = memo(({ name, options, onChange = null, ...otherProps }) => {
    const [field, mata] = useField(name);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const { setFieldValue } = useFormikContext();

    useEffect(() => {
        const selectedOption = options.find((option) => option.value == field.value);
        if (!isOpen && field.value && selectedOption) {
            setSelectedOption(selectedOption || null);
        } else {
            setSelectedOption(null);
        }
    }, [field.value, options]);

    const configSearch = {
        ...field,
        ...otherProps,
        InputLabelProps: {
            shrink: true
        },
        name: name
    };

    if (mata && mata.touched && mata.error) {
        configSearch.error = true;
        configSearch.helperText = mata.error;
    }

    const handleAutocompleteChange = (event, newValue) => {
        setIsOpen(false);
        setSelectedOption(newValue);
        setFieldValue(name, newValue?.value ?? '', false);
        if (onChange) {
            onChange(newValue);
        }
    };

    const textFieldOnChange = (event) => {
        event.target.value;
    };
    return (
        <Autocomplete
            value={selectedOption}
            options={options}
            disabled={otherProps?.disabled}
            className="autcomplete"
            sx={{
                width: '100%'
            }}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            getOptionLabel={(option) => option.name ?? ''}
            isOptionEqualToValue={(option) => option.value == field.value}
            onChange={handleAutocompleteChange}
            renderInput={(params) => <TextField {...params} {...configSearch} onChange={textFieldOnChange} />}
            renderOption={(props, option) => (
                <li {...props} key={option.value}>
                    {option.name}
                </li>
            )}
            noOptionsText={otherProps?.noOptionsText ?? 'No Options'}
        />
    );
});

export { SearchSelectField };
