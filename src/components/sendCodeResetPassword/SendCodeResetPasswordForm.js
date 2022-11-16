import React, { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// form// @mui
import { Link, Stack, IconButton, InputAdornment, Typography, styled } from '@mui/material';

// components
import Iconify from '../Iconify';

import { sendEmailUpdateAccountPassword } from '../../services/User';
import { ThemeContext } from '../context/Wrapper';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
//

const Label = styled(Typography)({
  fontSize:15,
  fontWeight:600
});
// ----------------------------------------------------------------------

export default function SendCodeResetPasswordForm() {
  const context = useContext(ThemeContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    is_partner: true,
    email: '',
    password: '',
    browser: 'temp',
  });

  const [errors, setErrors] = useState(false);

  const formIsValid = () => {
    const isValid = form.email && Object.values(errors).every((x) => x === '');
    return isValid;
  };

  const validate = (fieldValues) => {
    const temp = { ...errors };
    if ('email' in fieldValues) temp.email = fieldValues.email ? '' : 'Ce champ est requis.';
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
    };
    return payload;
  };
  const handleSubmit = () => {
    validate({form});
    if(formIsValid()){
      context.showLoader(true);
      const payloads = formatPayloadToSend();
      sendEmailUpdateAccountPassword(payloads)
        .then((datas) => {
          if (datas.data.status === 200) {
            // context.showLoader(false);
            navigate(`/enterCodeResetPassword/${datas.data.user_id}`);
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
          label={<Label>Adresse e-mail de réinitialisation de mot de passe</Label>}
          placeholder="exemple@exemple.com"
          type="email"
          onChange={handleChange}
          fullWidth
          {...(errors.email && {
            error: true,
            helpertext: errors.email,
          })}
        />
        
      </Stack>

      <CustomizedButton style={{marginTop: '25px'}} onClick={handleSubmit} fullWidth text={`Envoyer code`} component={RouterLink} to="#"/>
    </form>
  );
}
