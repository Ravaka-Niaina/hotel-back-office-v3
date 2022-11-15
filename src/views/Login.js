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
    <Page title="AIOLIA | Connexion" sx={{ backgroundColor: '#E8F0F8' }}>
      <RootStyle>
        <HeaderStyle>
          <div> </div>
        </HeaderStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <img src={`${process.env.PUBLIC_URL}/images/logo/logowcolor.png`} alt={`login_logo`} style={{ margin: 'auto' }} width={250} height={250} />
            <LoginForm />
            <p style={{padding:'2em',fontSize:'12px',textAlign:'justify',color:'#4D4D4D'}}>
              Conditions générales: Pour accéder à ce site Internet et l'utiliser, vous devez avoir une permission écrite sous la forme d'un accord contractuel de AIOLIA. Ce site Web est protégé par des droits d'auteurs et constitue la propriété de AIOLIA. Toute utilisation de ce site Web contraire à celle stipulée dans l'accord contractuel et toute distribution des noms d'utilisateurs et des mots de passe à d'autres entités qui ne sont pas sous contrat avec AIOLIA sont strictement interdites et seront considérées comme une violation de confidentialité pouvant entraîner d'éventuelles implications légales et financières.
            </p>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
