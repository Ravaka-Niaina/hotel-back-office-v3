import * as Yup from 'yup';
import { useState, useContext } from 'react';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { register } from '../../../services/User';
import { ThemeContext } from '../../../components/context/Wrapper';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const context = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Nom obligatire'),
    first_name: Yup.string().required('Prenom obligatoire'),
    email: Yup.string().email('Email must be a valid email address').required('Email obligatoire'),
    backupEmail: Yup.string().email('Email must be a valid email address').required('Email de secours obligatoire'),
    phone: Yup.string().required('Telephone obligatoire'),
    password: Yup.string().required('Mot de passe obligatoire'),
    confirmed_password: Yup.string().required('Confirmer votre mot de passe'),
  });

  const defaultValues = {
    name: '',
    first_name: '',
    email: '',
    backupEmail: '',
    phone: '',
    password: '',
    confirmed_password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (e) => {
    const payload = {
      isPartner: true,
      name: e.name,
      first_name: e.first_name,
      email: e.email,
      backupEmail: e.backupEmail,
      password: e.password,
      confirmed_password: e.confirmed_password,
      phone: e.phone,
    };
    register(payload)
      .then((registerResult) => {
        if (registerResult.data.status === 200) {
          context.changeResultSuccessMessage(`${registerResult.data.msg}`);
          context.showResultSuccess(true);
        } else {
          context.changeResultErrorMessage(registerResult.data.msg);
          context.showResultError(true);
        }
      })
      .catch((e) => {
        context.changeResultErrorMessage(e.message);
        context.showResultError(true);
      });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="name" label="Nom" />
          <RHFTextField name="first_name" label="Prenom" />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="email" label="Adresse e-mail" />
          <RHFTextField name="phone" label="Telephone" />
        </Stack>
        <RHFTextField name="backupEmail" label="Adresse e-mail de secours" />

        <RHFTextField
          autoComplete="on"
          name="password"
          label="Mot de Passe"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
          name="confirmed_password"
          label="Confirmation de mot de passe"
          type={showPassword ? 'text' : 'password'}
          autoComplete="on"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          S'inscrire
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
