import * as Yup from 'yup';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

import { FormProvider, RHFTextField } from '../hook-form';
import { verifyCode, resendCode } from '../../services/User';
import { ThemeContext } from '../context/Wrapper';

// ----------------------------------------------------------------------

const VerifyCodeForm = () => {
  const context = useContext(ThemeContext);
  const navigate = useNavigate();
  const [loadingResend, setLoadingResend] = useState(false);

  const CodeSchema = Yup.object().shape({
    code: Yup.string().required('code required'),
  });

  const defaultValues = {
    code: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(CodeSchema),
    defaultValues,
  });

  const resendMethods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const removeDoubleQuotes = (str) => {
    const toReplace = '"';
    return str.replaceAll(toReplace, '');
  };
  const onSubmit = async (e) => {
    const user = JSON.parse(localStorage.getItem('partner_id'));
    const payload = {
      isPartner: true,
      idUser: user,
      verificationCode: e.code,
    };
    const verifyResult = await verifyCode(payload);
    if (verifyResult.data.status === 200) {
      localStorage.setItem('id_token', removeDoubleQuotes(verifyResult.data.id_token));
      navigate('/dashboard/app');
    } else {
      context.changeResultErrorMessage(verifyResult.data.message);
      context.showResultError(true);
    }
  };
  const onSubmitResend = async (e) => {
    e.preventDefault();
    setLoadingResend(true);
    const user = JSON.parse(localStorage.getItem('partner_id'));
    const payload = {
      isPartner: true,
      idUser: user,
    };
    resendCode(payload)
      .then((resendResult) => {
        if (resendResult.data.status === 200) {
          setLoadingResend(false);
          context.changeResultSuccessMessage('Votre code de vérification a été renvoyé');
          context.showResultSuccess(true);
        } else {
          context.changeResultErrorMessage(resendResult.data.message);
          context.showResultError(true);
        }
      })
      .catch(() => {
        context.changeResultErrorMessage('Une erreur est survenue lors du verification.');
        context.showResultError(true);
      });
  };

  return (
    <>
      <Stack spacing={3}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <RHFTextField name="code" label="Entrer le code" />
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Verifier
            </LoadingButton>
          </Stack>
        </FormProvider>
        <FormProvider methods={resendMethods} onSubmit={onSubmitResend}>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loadingResend}>
            Renvoyer le code
          </LoadingButton>
        </FormProvider>
      </Stack>
    </>
  );
};
export default VerifyCodeForm;
