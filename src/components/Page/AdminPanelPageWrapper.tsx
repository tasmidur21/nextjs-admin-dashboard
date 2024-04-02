import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, Container, Divider, Grid } from '@mui/material';
import Head from 'next/head';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageTitle from '@/components/PageTitle';
import { useAppConfig } from '@/contexts/ApplicationConfigContext';

interface IAdminPanelPageWrapper {
  pageHeaderTitle?: string;
  pageTitle?: string;
  pageSubTitle?: string;
  actionButton?: ReactNode;
  children?: ReactNode;
}

const AdminPanelPageWrapper: FC<IAdminPanelPageWrapper> = ({
                                                             pageHeaderTitle,
                                                             pageTitle,
                                                             pageSubTitle,
                                                             actionButton,
                                                             children
                                                           }) => {
  const {appConfig}=useAppConfig();
  return (
    <>
      <Head>
        <title>{`${appConfig.appName}::${pageHeaderTitle}`}</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading={pageTitle}
          subHeading={pageSubTitle}
          buttonComponent={actionButton}
        />
      </PageTitleWrapper>
      <Container maxWidth="xlg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardContent>
                {children}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>

  );
};

AdminPanelPageWrapper.propTypes = {
  pageHeaderTitle: PropTypes.string,
  pageTitle: PropTypes.string,
  pageSubTitle: PropTypes.string,
  actionButton: PropTypes.node,
  children: PropTypes.node.isRequired
} as any;

export default AdminPanelPageWrapper;
