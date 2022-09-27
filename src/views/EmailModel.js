import { Stack, Container } from '@mui/material';
import Page from '../components/Page';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import { UserListToolbar } from '../components/table';
import Scrollbar from '../components/Scrollbar';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import { lightBackgroundToTop } from '../components/CustomizedComponents/NeumorphismTheme';

export default function EmailModel() {
  return (
    <Page title="AOLIA | Modèle Email">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <CustomizedTitle size={20} text="Modèle d'email" />
        </Stack>
        <CustomizedPaperOutside
          sx={{
            ...lightBackgroundToTop,
            minHeight: '100vh',
            border: '1px white solid',
            color: '#787878',
            padding: 5,
          }}
        >
          <UserListToolbar />
          <Scrollbar>Scroll</Scrollbar>
        </CustomizedPaperOutside>
      </Container>
    </Page>
  );
}
