import React, { useState, useEffect } from 'react';
import { TextField, Chip } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import makeStyles from '@mui/styles/makeStyles';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './style/custom2.css';

const filter = createFilterOptions();

const useStyles = makeStyles(() => ({
    autocompleteInput: {
        '& .MuiInput-underline:before': {
            borderBottom: 'none'
        },
        '& .MuiInput-underline:after': {
            borderBottom: '1px solid red'
        },
        '& .MuiInput-underline:hover:before': {
            borderBottom: 'none'
        },
        '& .MuiInput-underline.Mui-focused:before': {
            borderBottom: 'none'
        }
    }
}));

const MultiSelect = ({ name, label, options }) => {
    const { setFieldValue } = useFormikContext();
    const classes = useStyles();
    const [field, mata] = useField(name);
    const [selectedOption, setSelectedOption] = useState([]);

    useEffect(() => {
        if (Array.isArray(field.value)) {
            setSelectedOption(field.value);
        } else {
            setSelectedOption([]);
        }
    }, [field.value, options]);

    const handleChange = (event, newValue) => {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        const validEmial =
            newValue?.filter((v) => {
                return v?.name.match(validRegex);
            }) ?? [];

        if (validEmial.length && newValue.length) {
            setFieldValue(name, validEmial, false);
        } else {
            setFieldValue(name, [], false);
        }
    };

    const handleFilterOption = (options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
            filtered.push({
                value: inputValue,
                name: inputValue
            });
        }

        return filtered;
    };

    return (
        <Autocomplete
            value={selectedOption}
            className="autcomplete"
            multiple
            options={options}
            onChange={handleChange}
            filterOptions={handleFilterOption}
            getOptionLabel={(option) => option?.name}
            renderOption={(props, option) => <li {...props}>{option?.name}</li>}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    InputLabelProps={{
                        shrink: true
                    }}
                    className={classes.autocompleteInput}
                    error={Boolean(mata && mata.touched && mata.error)}
                />
            )}
            renderTags={(value, getTagProps) =>
                value?.map((value, index) => (
                    <Chip
                        sx={{ borderRadius: 20, height: 28, color: '#83869a' }}
                        label={value?.name}
                        {...getTagProps({ index })}
                        deleteIcon={<HighlightOffIcon />}
                    />
                ))
            }
        />
    );
};

export default MultiSelect;
