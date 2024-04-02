import React from 'react';
import {Field} from 'formik';
import {CheckboxWithLabel} from 'formik-mui';

const MultiCheckBox = ({name, label, value, onClick = null}) => {
     const handleOnClick = (event) => {
         if(onClick){
             onClick(event);
         }
     }
    return (
        <Field
            type="checkbox"
            component={CheckboxWithLabel}
            name={name}
            value={value}
            Label={{label: label}}
            onClick={handleOnClick}
        />
    );
};

export default MultiCheckBox;