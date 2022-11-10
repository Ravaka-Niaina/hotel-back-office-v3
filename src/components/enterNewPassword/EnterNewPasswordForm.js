import React, { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink, useParams } from 'react-router-dom';
// form// @mui
import { Link, Stack, IconButton, InputAdornment, Typography, styled } from '@mui/material';

// components
import Iconify from '../Iconify';

import { updatePassword } from '../../services/User';
import { ThemeContext } from '../context/Wrapper';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
//

const Label = styled(Typography)({
  fontSize:15,
  fontWeight:600
});
// ----------------------------------------------------------------------

export default function EnterNewPasswordForm() {
  const context = useContext(ThemeContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    is_partner: true,
    password: '',
    confirm_password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(false);

  const params = useParams();

  const formIsValid = () => {
    const isValid = form.password && form.confirm_password && Object.values(errors).every((x) => x === '');
    return isValid;
  };

  const validate = (fieldValues) => {
    const temp = { ...errors };
    if ('password' in fieldValues) temp.password = fieldValues.password ? '' : 'Ce champ est requis.';
    if ('confirm_password' in fieldValues) temp.confirm_password = fieldValues.confirm_password ? '' : 'Ce champ est requis.';
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
      id: params.userId,
      mdp: form.password,
      confirm: form.confirm_password,
      code: Number.parseInt(localStorage.getItem('codeTmp'), 10),
    };
    return payload;
  };
  const handleSubmit = () => {
    validate({form});
    if(formIsValid()){
      context.showLoader(true);
      const payloads = formatPayloadToSend();
      updatePassword(payloads)
        .then((datas) => {
          context.showLoader(true);
          if (datas.data.status === 200) {
            localStorage.removeItem('codeTmp');
            // navigate('/login');
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

        <CustomizedInput
          sx={{ width: 1, fontSize: 17 }}
          type={showPassword ? 'text' : 'password'}
          name="confirm_password"
          label='Confirmation mot de passe'
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

      <CustomizedButton style={{ marginTop: '25px' }} onClick={handleSubmit} fullWidth text={`Valider nouveau mot de passe`} component={RouterLink} to="#"/>
    </form>
  );
}
