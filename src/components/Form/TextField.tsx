import React, { memo, useMemo } from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

const TextFieldWrapper = memo(({ name, ...otherProps }) => {
    const [field, mata] = useField(name);
    const getType:any = otherProps?.type;
    const handleKeyPress = (e) => {
        if (getType === 'number') {
            const { key } = e;
            if (!/[0-9. \b]/.test(key)) {
                e.preventDefault();
            }
        } else {
            e.target = e.target.value;
        }
    };

    const handleOnKeyDown = (e) => {
        if (getType === 'number') {
            if (otherProps?.withDot) {
                ['ArrowUp', 'ArrowDown', 'e', 'E', '.'].includes(e.key) && e.preventDefault();
            } else {
                ['ArrowUp', 'ArrowDown', 'e', 'E'].includes(e.key) && e.preventDefault();
            }
        } else {
            e.target = e.target.value;
        }
    };

    const handleOnFocus = (e) => {
        if (getType === 'number') {
            e.target.addEventListener(
                'wheel',
                function (e) {
                    e.preventDefault();
                },
                { passive: false }
            );
        } else {
            e.target = e.target.value;
        }
    };

    const configTextfield = useMemo(() => {
        const config = {
            ...field,
            ...otherProps,
            fullWidth: true,
            variant: 'outlined',
            InputLabelProps: {
                shrink: true
            },
            onKeyPress: handleKeyPress,
            onKeyDown: handleOnKeyDown,
            onFocus: handleOnFocus
        };

        if (mata && mata.touched && mata.error) {
            config.error = true;
            config.helperText = mata.error;
        }
        return config;
    }, [field, mata, otherProps]);

    return (
        <>
            <TextField {...configTextfield} />
        </>
    );
});

export default TextFieldWrapper;
