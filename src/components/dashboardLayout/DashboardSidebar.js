import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mock
import account from '../../_mock/account';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Scrollbar from '../Scrollbar';
import NavSection from './NavSection';
//
import { getNavConfig } from './NavConfig';
import { ThemeContext } from '../context/Wrapper';
import { getToken } from '../../services/User';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

const DrawerStyle = styled(Drawer)({});
// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const context = useContext(ThemeContext);
  const isDesktop = useResponsive('up', 'lg');
  const [navConfig, setNavConfig] = useState(null);
  useEffect(() => {
    const initiateNavConfig = async () => {
      const newNavConfig = await getNavConfig(getToken());
      setNavConfig(newNavConfig);
    };
    initiateNavConfig();
  }, []);
  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box>
        <img
          src={`${process.env.PUBLIC_URL}/images/logo/logowcolor.png`}
          alt="logo_aiolia"
          width={200}
          style={{ margin: 'auto' }}
        />
      </Box>

      {navConfig && <NavSection navConfig={navConfig}/>}
      {/* <Box sx={{ flexGrow: 1 }} /> */}
      <Box>
        <Stack spacing={3} sx={{ borderRadius: 2, position: 'relative' }}>
          <Box>
            <Link underline="none" component={RouterLink} to="#">
              <AccountStyle>
                <Avatar src={account.photoURL} alt="photoURL" />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                    {account.displayName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {account.role}
                  </Typography>
                </Box>
              </AccountStyle>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <DrawerStyle
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH, backgroundColor: '#E8F0F8' },
          }}
        >
          {renderContent}
        </DrawerStyle>
      )}

      {isDesktop && (
        <DrawerStyle
          open
          variant="persistent"
          PaperProps={{
            sx: {
              zIndex: 20,
              boxShadow: '0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)',
              width: DRAWER_WIDTH,
              // bgcolor:'background.default',
              backgroundColor: '#E8F0F8',
            },
          }}
        >
          {renderContent}
        </DrawerStyle>
      )}
    </RootStyle>
  );
}
