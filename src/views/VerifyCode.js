
// @mui
import { styled } from '@mui/material/styles';
import {Container, Typography } from '@mui/material';
// hooks
// import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
// sections
import { VerifyCodeForm } from '../components/verify';

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

// const SectionStyle = styled(Card)(({ theme }) => ({
//   width: '100%',
//   maxWidth: 464,
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   margin: theme.spacing(2, 0, 2, 2),
// }));

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





const VerifyCode = () => {
  // const smUp = useResponsive('up', 'sm');

  // const mdUp = useResponsive('up', 'md');
  const censoredPhoneNumber = '+261-XXX-XXX-XX-XX';
  return (
    <Page title="AIOLIA | Verification de code" sx={{ backgroundColor: '#E8F0F8' }}> 
      <RootStyle>
        <HeaderStyle>
          <div> </div>
        </HeaderStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            {/* <img src={`${process.env.PUBLIC_URL}/images/logo/logowcolor.png`} alt={`login_logo`} style={{ margin: 'auto' }} width={250} height={250} /> */}
            <CustomizedTitle text='Code de vérification' size='34' level={2}/>
            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Entrez le code que nous avons envoyé à {censoredPhoneNumber} pour vous connecter.</Typography>

            <VerifyCodeForm />
            
          </ContentStyle>
        </Container>
      </RootStyle>
  
    </Page>
  );
}
export default VerifyCode;
