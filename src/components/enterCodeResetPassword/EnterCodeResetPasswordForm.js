import React, { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink, useParams } from 'react-router-dom';
// form// @mui
import { Link, Stack, IconButton, InputAdornment, Typography, styled } from '@mui/material';

// components
import Iconify from '../Iconify';

import { verifyCodeResetPassword } from '../../services/User';
import { ThemeContext } from '../context/Wrapper';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
//

const Label = styled(Typography)({
  fontSize:15,
  fontWeight:600
});
// ----------------------------------------------------------------------

export default function EnterCodeResetPasswordForm() {
  const context = useContext(ThemeContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    code: '', 
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(false);

  const params = useParams();

  const formIsValid = () => {
    const isValid = form.code && Object.values(errors).every((x) => x === '');
    return isValid;
  };

  const validate = (fieldValues) => {
    const temp = { ...errors };
    if ('code' in fieldValues) temp.code = fieldValues.code ? '' : 'Ce champ est requis.';
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
      code: form.code, 
      _id: params.userId, 
      isPartner: true,
    };
    return payload;
  };
  const handleSubmit = () => {
    validate({form});
    if(formIsValid()){
      context.showLoader(true);
      const payloads = formatPayloadToSend();
      console.log(payloads);
      verifyCodeResetPassword(payloads)
        .then((datas) => {
          context.showLoader(false);
          if (datas.data.status === 200) {
            localStorage.setItem('codeTmp', form.code);
            // context.showLoader(false);
            setTimeout(() => {
              navigate(`/enterNewPassword/${params.userId}`);
            }, 1000);
          }
          else
          {
            context.changeResultErrorMessage(`Une erreur s'est produite,veuillez réessayer plus tard.`);
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
          name="code"
          label={<Label>Code de reinitialisation mot de passe</Label>}
          placeholder="exemple: 2070"
          type="number"
          onChange={handleChange}
          fullWidth
          {...(errors.code && {
            error: true,
            helpertext: errors.code,
          })}
        />
        
      </Stack>

      <CustomizedButton style={{marginTop: '25px'}} onClick={handleSubmit} fullWidth text={`Valider`} component={RouterLink} to="#"/>
    </form>
  );
}
