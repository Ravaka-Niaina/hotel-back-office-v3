import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Paper, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
// sections
import { RegisterForm } from '../sections/auth/register';
import AuthSocial from '../sections/auth/AuthSocial';

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

const SectionStyle = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  backgroundColor: '#33647E',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
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

export default function Register() {
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Register" sx={{ backgroundColor: '#D6E3F3' }}>
      <RootStyle>
        <HeaderStyle>
          {/* <Logo /> */}
          <div> </div>
          {smUp && (
            <Typography variant="body2" sx={{ fontSize: 15, fontWeight: 500, color: '#8B9EB0', mt: { md: -2 } }}>
              Avez-vous déjà un compte? {''}
              <Link component={RouterLink} to="/login">
                Se connecter
              </Link>
            </Typography>
          )}
        </HeaderStyle>
        {mdUp && (
          <SectionStyle elevation={12}>
            <Typography
              variant="h3"
              sx={{
                fontSize: 25,
                fontWeight: 800,
                color: '#DDE2EA',
                px: 5,
                mt: 0,
                mb: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '&:after': {
                  content: '""',
                  marginTop: 5,
                  width: '75%',
                  borderTop: '1px solid white',
                },
              }}
            >
              Vous devrez vous inscrire pour leur adhésion en ligne gratuite.
            </Typography>
            <img alt="register" src="/static/illustrations/illustration_register.png" />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Typography
              variant="h4"
              sx={{
                fontSize: 25,
                fontWeight: 800,
                color: '#8B9EB0',
                display: 'flex',
                flexDirection: 'column',
                '&:after': {
                  content: '""',
                  mt: 2,
                  mb: 2,
                  width: '75%',
                  borderTop: '1px solid #8B9EB0',
                },
              }}
              gutterBottom
            >
              Inscription
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Inscription gratuite.</Typography>

            <AuthSocial />

            <RegisterForm />

            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              En m'inscrivant, j'accepte les &nbsp;
              <Link underline="always" color="text.primary" href="#">
                conditions minimales d'utilisation
              </Link>{' '}
              et{' '}
              <Link underline="always" color="text.primary" href="#">
                la politique de confidentialité.
              </Link>
              .
            </Typography>

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                Avez-vous déjà un compte? {''}
                <Link variant="subtitle2" to="/login" component={RouterLink}>
                  Se connecter
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
