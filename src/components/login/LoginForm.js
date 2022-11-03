import React, { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// form// @mui
import { Link, Stack, IconButton, InputAdornment, Typography, styled } from '@mui/material';

// components
import Iconify from '../Iconify';

import { login } from '../../services/User';
import { ThemeContext } from '../context/Wrapper';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
//

const Label = styled(Typography)({
  fontSize:15,
  fontWeight:600
});
// ----------------------------------------------------------------------

export default function LoginForm() {
  const context = useContext(ThemeContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    is_partner: true,
    email: '',
    password: '',
    browser: 'temp',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(false);

  const formIsValid = () => {
    const isValid = form.email && form.password && Object.values(errors).every((x) => x === '');
    return isValid;
  };

  const validate = (fieldValues) => {
    const temp = { ...errors };
    if ('email' in fieldValues) temp.email = fieldValues.email ? '' : 'Ce champ est requis.';
    if ('password' in fieldValues) temp.password = fieldValues.password ? '' : 'Ce champ est requis.';
    setErrors({
      ...temp,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validate({ [name]: value });
  };
  const formatPayloadToSend = () => {
    const payload = {
      is_partner: true,
      email: form.email,
      mdp: form.password,
      browser: 'temp',
    };
    return payload;
  };
  const handleSubmit = () => {
    validate({form});
    if(formIsValid()){
      context.showLoader(true);
      const payloads = formatPayloadToSend();
      console.log(payloads);
      login(payloads)
        .then((datas) => {
          const dataMessage = datas.data.message;
          const dataPartnerId = datas.data.partner_id;
          if (dataMessage === 'OK') {
            localStorage.setItem('partner_id', JSON.stringify(dataPartnerId));
            navigate('/verifycode');
          } else {
            context.changeResultErrorMessage('Vos identifiants sont incorrects,veuillez réessayer.');
            context.showResultError(true);
          }
        })
        .catch(() => {
          context.changeResultErrorMessage(`Une erreur s'est produite,veuillez réessayer plus tard.`);
          context.showResultError(true);
        })
        .finally(() => {
          context.showLoader(false);
        });
    }
  };
  return (
    <form>
      <Stack spacing={3}>
        <CustomizedInput
          sx={{ width: 1, fontSize: 17 }}
          name="email"
          label={<Label>Adresse e-mail</Label>}
          placeholder="exemple@exemple.com"
          type="email"
          onChange={handleChange}
          fullWidth
          {...(errors.email && {
            error: true,
            helpertext: errors.email,
          })}
        />
        <CustomizedInput
          sx={{ width: 1, fontSize: 17 }}
          type={showPassword ? 'text' : 'password'}
          name="password"
          label='Mot de passe'
          placeholder="mot de passe"
          autoComplete="on"
          onChange={handleChange}
          fullWidth
          {...(errors.password && {
            error: true,
            helpertext: errors.password,
          })}
          {...{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          Mot de passe oublié?
        </Link>
      </Stack>

      <CustomizedButton onClick={handleSubmit} fullWidth text={`Se connecter`} component={RouterLink} to="#"/>
    </form>
  );
}
