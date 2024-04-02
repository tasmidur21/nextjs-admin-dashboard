import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useFormikContext } from 'formik';
import { useTheme } from '@mui/material/styles';

const ButtonWrapper = ({ children, ...otherProps }) => {
    const { submitForm } = useFormikContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const theme =useTheme();

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await submitForm();
        setIsSubmitting(false);
    };

    const configButton = {
        variant: 'contained',
        color: theme.palette.primary,
        fullWidth: false,
        onClick: handleSubmit,
        disabled: isSubmitting
    };

    return (
        <Button style={{ fontSize: '13px', height: '30px' }} {...configButton} {...otherProps}>
            {children}
        </Button>
    );
};

export default ButtonWrapper;
