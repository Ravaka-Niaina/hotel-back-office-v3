// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// hooks
// components
import Page from '../components/Page';
// sections
import { LoginForm } from '../components/login';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));
// ----------------------------------------------------------------------

export default function Login() {
  return (
    <Page title="Login" sx={{ backgroundColor: '#E8F0F8' }}>
      <RootStyle>
        <HeaderStyle>
          <div> </div>
        </HeaderStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <img src={`${process.env.PUBLIC_URL}/images/logo/logowcolor.png`} alt={`login_logo`} style={{ margin: 'auto' }} width={250} height={250} />
            <LoginForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
