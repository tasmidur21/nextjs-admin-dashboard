import React, { useState } from 'react';
import { useFormikContext, ErrorMessage } from 'formik';
import { Box, InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TreeSelect } from 'antd';
import './style/custom.css';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
    error: {
        color: theme.palette.error.main,
        marginTop: theme.spacing(1)
    }
}));

const TreeSelectWrapper = ({
    name,
    label,
    options,
    placeholder = '',
    handlePosition = null,
    multiple = false,
    disabled = false,
    ...otherProps
}) => {
    const classes = useStyles();
    const theme = useTheme();
    const { values, errors, touched, setFieldValue } = useFormikContext();

    const myHandeler = (value, data) => {
        if (handlePosition) {
            handlePosition(value, data);
        }
    };

    // Searchable tree by title name
    const filterTreeNodes = (inputValue, treeNode) => {
        return treeNode?.title.toLowerCase().includes(inputValue.toLowerCase());
    };

    const hasError = errors[name] && touched[name];
    const TreeConfiguration = {
        name: name,
        treeData: options,
        value: values[name] ? values[name] : null,
        onChange: (value, labelList, extra) => {
            setFieldValue(name, value);
            myHandeler(value, extra?.triggerNode?.props);
        },
        treeLine: true,
        style: {
            width: '100%',
            zIndex: 10
        },
        dropdownStyle: {
            maxHeight: 400,
            overflow: 'auto',
            paddingLeft: 5
        },
        placeholder: ' ',
        treeDefaultExpandAll: true,
        status: hasError ? 'error' : undefined,
        multiple: multiple,
        disabled: disabled,
        allowClear: true,
        showSearch: true
    };
    return (
        <Box
            sx={{
                position: 'relative'
            }}
        >
            <span
                style={{
                    color: hasError ? '#f33339' : '#595959',
                    fontSize: '12px',
                    zIndex: 20,
                    top: '-15px',
                    left: '10px',
                    position: 'absolute',
                    background: 'white',
                    width: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    border: '2px solid white'
                    // border: "5px solid white"
                }}
            >
                {label}
            </span>
            <TreeSelect {...TreeConfiguration} {...otherProps} filterTreeNode={filterTreeNodes} />
            <ErrorMessage name={name} component="div" className={classes.error} />
        </Box>
    );
};

export default TreeSelectWrapper;
