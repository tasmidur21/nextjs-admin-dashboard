import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/Transactions/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import withAuth from '@/middleware/withAuth.midleware';

function Users() {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>

          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

Users.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default Users;
