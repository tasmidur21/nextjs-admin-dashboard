import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import * as React from 'react';

export default function SubmitButton({ label = 'Submit', icon = null, float = 'right', ...otherProps }) {
    return (
        <Grid item xs={12}>
            <Button
                sx={{
                    float
                }}
                variant="contained"
                startIcon={icon}
                type="submit"
                {...otherProps}
            >
                {label}
            </Button>
        </Grid>
    );
}
