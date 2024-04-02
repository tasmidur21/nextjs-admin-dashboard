import React, { useState, useEffect, useMemo } from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';
import { Field, useField, useFormikContext } from 'formik';
import './style/custom.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

/**
 *
 * @param name
 * @param options ->>>{
 *     name:"labelName",
 *     value:"value"
 * }
 * @param otherProps
 * @returns {JSX.Element}
 * @constructor
 */
const MultiSelectWrapper = ({ name, options, disabled = false, handleChange = null, ...otherProps }) => {
    const { setFieldValue } = useFormikContext();
    const [field, mata] = useField(name);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const memoizedOptions = useMemo(() => {
        return options.filter(({ value }) => {
            if (Array.isArray(field.value)) {
                return field.value.includes(value);
            }
            return false;
        });
    }, [field.value, options]);

    useEffect(() => {
        if (!isOpen && field.value) {
            if (handleChange) {
                handleChange(memoizedOptions);
            }
            setSelectedOptions(memoizedOptions);
        }
    }, [field.value, options, memoizedOptions]);

    const configSelect = {
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
        configSelect.error = true;
        configSelect.helperText = mata.error;
    }

    const localChangeHandler = (newValue) => {
        setSelectedOptions(newValue);
        if (otherProps?.setBranchChangeData) {
            otherProps?.setBranchChangeData(newValue);
        }
        if (handleChange) {
            handleChange(newValue);
        }
    };
    return (
        <Autocomplete
            value={selectedOptions}
            className="autcomplete"
            multiple
            disabled={disabled}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            options={options}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            onChange={(event, newValue) => {
                localChangeHandler(newValue);
                setFieldValue(
                    name,
                    newValue.map((v) => v.value),
                    false
                );
            }}
            renderInput={(params) => {
                return <TextField {...params} {...configSelect} />;
            }}
            renderOption={(props, option) => (
                <li {...props} key={option.value}>
                    {option.name}
                </li>
            )}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        sx={{ background: option.color ?? null, color: option.color ? 'white' : '#262626' }}
                        label={option.name}
                        {...getTagProps({ index })}
                        deleteIcon={<HighlightOffIcon />}
                        onDelete={() => {
                            const newValue = [...value];
                            newValue.splice(index, 1);
                            localChangeHandler(newValue);
                            setFieldValue(
                                name,
                                newValue.map((v) => v.value)
                            );
                        }}
                    />
                ))
            }
        />
    );
};

export default MultiSelectWrapper;
