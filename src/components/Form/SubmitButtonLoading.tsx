import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import LoadingButton from '@mui/lab/LoadingButton';
export default function SubmitButtonLoading({label="Submit", icon=null, loading=false}){
    return(
        <Grid item xs={12}>
            <LoadingButton
                sx={{
                    float: "right"
                }}
                variant="contained"
                startIcon={icon}
                loading={loading}
                size="small"
                type="submit"
            >
                {label}
            </LoadingButton>
        </Grid>
    )
}

