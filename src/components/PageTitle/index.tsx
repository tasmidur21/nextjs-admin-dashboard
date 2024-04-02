import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Grid } from '@mui/material';

interface PageTitleProps {
  heading?: string;
  subHeading?: string;
  buttonComponent?: ReactNode;
  rest?:any;
}

const PageTitle: FC<PageTitleProps> = ({
  heading = '',
  subHeading = '',
  buttonComponent,
  ...rest
}) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="subtitle2">{subHeading}</Typography>
      </Grid>
      <Grid item>
        {buttonComponent}
      </Grid>
    </Grid>
  );
};

PageTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  buttonComponent: PropTypes.string
};

export default PageTitle;
