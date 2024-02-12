// material
import { Stack, Button, Divider, Typography } from '@mui/material';
// component
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

export default function AuthSocial() {
  return (
    <>
      <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={{ xs: 2 }}>
        <Button
          sx={{
            height: 100,
            width: 100,
            background: '#E3EDF7',
            boxShadow:
              ' -4px -4px 15px  #FFFFFF, 4px 4px 20px rgba(111, 140, 176, 0.41),2px 2px 4px rgba(114, 142, 171, 0.1)',
            borderRadius: '12px',
          }}
        >
          <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
        </Button>

        <Button
          sx={{
            height: { xs: 100 },
            width: 100,
            background: '#E3EDF7',
            boxShadow:
              ' -4px -4px 15px  #FFFFFF, 4px 4px 20px rgba(111, 140, 176, 0.41),2px 2px 4px rgba(114, 142, 171, 0.1)',
            borderRadius: '12px',
          }}
        >
          <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
        </Button>

        <Button
          sx={{
            height: 100,
            width: 100,

            background: '#E3EDF7',
            boxShadow:
              ' -4px -4px 15px  #FFFFFF, 4px 4px 20px rgba(111, 140, 176, 0.41),2px 2px 4px rgba(114, 142, 171, 0.1)',
            borderRadius: '12px',
          }}
        >
          <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OU
        </Typography>
      </Divider>
    </>
  );
}
