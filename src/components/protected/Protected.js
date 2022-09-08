import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThemeContext } from '../context/Wrapper';

const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  PARTNER: 'partner',
};
const Protected = ({ child, superAdmin, admin, partner }) => {
  const context = useContext(ThemeContext);
  const navigate = useNavigate();
  // The state of the auth
  const [isAuth, setIsAuth] = useState(false);

  // A function that will determine if the user has the required roles or not
  const checkAuthWithRole = useCallback(
    (allowed) => {
      context.showLoader(true);
      const testPayload = {
        partnerId: 'it_s_just_a_test_lol',
        roles: ['super_admin', 'admin'],
      };
      const roles = testPayload?.roles;
      const isAllowed = allowed.some((allowedRole) => roles.some((userRole) => allowedRole === userRole));
      if (!isAllowed) {
        context.showLoader(false);
        navigate('/login');
      } else {
        context.showLoader(false);
        return isAllowed;
      }
    },
    [navigate]
  );

  // The useEffect that will define if the user can access the page or not
  useEffect(() => {
    const allowedRoles = [];
    if (superAdmin) allowedRoles.push(ROLES.SUPER_ADMIN);
    if (admin) allowedRoles.push(ROLES.ADMIN);
    if (partner) allowedRoles.push(ROLES.PARTNER);
    // console.log('mety');
    setIsAuth(checkAuthWithRole(allowedRoles));
  }, [admin, superAdmin, partner, checkAuthWithRole]);

  return (
    <>
      {isAuth ? (
        child
      ) : (
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Please login first
        </div>
      )}
    </>
  );
};
Protected.propTypes = {
  child: PropTypes.any,
  superAdmin: PropTypes.bool,
  admin: PropTypes.bool,
  partner: PropTypes.bool,
};
export default Protected;
