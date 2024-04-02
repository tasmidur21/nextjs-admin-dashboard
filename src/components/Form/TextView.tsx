import Typography from "@mui/material/Typography";

export default function TextView({variant = "body2", label, value}) {

    return (
        <Typography variant={variant} component="div">
           <strong>{label}</strong>:  {value}
        </Typography>
    )
}
