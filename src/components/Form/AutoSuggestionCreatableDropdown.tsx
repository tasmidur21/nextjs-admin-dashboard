import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {useField, useFormikContext} from "formik";
import   './style/custom.css';

const filter = createFilterOptions();

export default function AutoSuggestionCreatableDropdown({
                                                            name,
                                                            options,
                                                            label,
                                                            handleOptionChange,
                                                            readOnly = false,
                                                            ...otherProps
                                                        }) {
    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(name);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (field.value) {
            let selectedOption = options.find(option => option.value == field.value);
            setSelectedOption(selectedOption ?? {name: field.value, value: field.value});
        }
        else{
            setSelectedOption(null);
        }
    }, [field.value, options]);

    const handleChange = (event, newValue) => {
        if (typeof newValue === 'string') {
            setFieldValue(name, newValue.value ?? newValue);
            if (handleOptionChange) {
                handleOptionChange(event, newValue?.value ?? newValue)
            }
        } else if (newValue && newValue?.inputValue) {
            // Create a new value from the user input
            setFieldValue(name, newValue?.inputValue);
        } else {
            setFieldValue(name, newValue?.value);
            if (handleOptionChange) {
                handleOptionChange(event, newValue?.value)
            }
        }
    };

    const handleFilterOption = (options, params) => {
        const filtered = filter(options, params);
        const {inputValue} = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
            filtered.push({
                inputValue,
                name: `Add ${inputValue}`,
            });
        }

        return filtered;
    };

    const handleLabelOption = (option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
            return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
            return option.inputValue;
        }
        // Regular option
        return option.name;
    }

    const configSelect = {
        ...field,
        ...otherProps,
        variant: 'outlined',
        fullWidth: true,
        readOnly: true,
        InputLabelProps: {
            shrink: true
        },
    };

    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }
    return (
        <Autocomplete
            value={selectedOption}
            className="autcomplete"
            onChange={handleChange}
            filterOptions={handleFilterOption}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={options}
            readOnly={readOnly}
            getOptionLabel={handleLabelOption}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            freeSolo
            renderInput={(params) => (
                <TextField {...params}{...configSelect} label={label}/>
            )}
        />
    )
}

