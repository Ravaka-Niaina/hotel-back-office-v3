import { Link as RouterLink } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box , Stack } from '@mui/material';
// components
import Page from '../components/Page';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';

// ----------------------------------------------------------------------

// const ContentStyle = styled('div')(({ theme }) => ({
//   maxWidth: 480,
//   margin: 'auto',
//   minHeight: '100vh',
//   display: 'flex',
//   justifyContent: 'center',
//   flexDirection: 'column',
//   padding: theme.spacing(12, 0)
// }));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <Page title="AIOLIA | 404">
      <Container>
        <Stack spacing={2} alignItems='center' sx={{textAlign:'center',p:10}}>
          <CustomizedTitle text='Désolé, page introuvable !' size={32} />
          <Typography sx={{ color: 'text.secondary' }}>
            Désolé, nous n'avons pas trouvé la page que vous recherchez. Peut-être avez-vous mal saisi l'URL ? Assurez-vous de vérifier votre orthographe.
          </Typography>
          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Aller à l'accueil 
          </Button>
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/images/logo/logowcolor.png`}
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />
        </Stack>
      </Container>
    </Page>
  );
}
