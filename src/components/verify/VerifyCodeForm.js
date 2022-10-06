import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// form
// @mui
import { Stack } from '@mui/material';
// components
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import { verifyCode, resendCode } from '../../services/User';
import { ThemeContext } from '../context/Wrapper';

// ----------------------------------------------------------------------

const VerifyCodeForm = () => {
  const context = useContext(ThemeContext);
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();
  const removeDoubleQuotes = (str) => {
    const toReplace = '"';
    return str.replaceAll(toReplace, '');
  };
  const validate = (fields) => {
    const temp = { ...errors };
    if ('code' in fields) {
      temp.code = '';
      const number = parseInt(fields.code, 10)
      if (Number.isNaN(number)) {
        temp.code = 'Ce champ est requis';
      }
      else if (number <= 0) {
        temp.code = 'Code invalide';
      }
    }
    setErrors(temp);
  };
  const formIsValid = () => {
    const isValid = Object.values(errors).every((x) => x === '');
    return isValid;
  };
  const onSubmit = async (e) => {
    validate({ code });
    if (formIsValid() && code !== '') {
      context.showLoader(true);
      const user = JSON.parse(localStorage.getItem('partner_id'));
      const payload = {
        isPartner: true,
        idUser: user,
        verificationCode: code,
      };
      verifyCode(payload)
        .then((verifyResult) => {
          if (verifyResult.data.status === 200) {
            localStorage.setItem('id_token', removeDoubleQuotes(verifyResult.data.id_token));
            localStorage.setItem('user_attr', JSON.stringify(verifyResult.data.user_attr));
            window.location = "/dashboard/app"
          } else {
            context.changeResultErrorMessage(verifyResult.data.message);
            context.showResultError(true);
          }
        })
        .catch((e) => {
          context.changeResultErrorMessage(e.message);
          context.showResultError(true);
        })
        .finally(() => {
          context.showLoader(false);
        });
    }
  };
  const onSubmitResend = async (e) => {
    e.preventDefault();
    context.showLoader(true);
    const user = JSON.parse(localStorage.getItem('partner_id'));
    const payload = {
      isPartner: true,
      idUser: user,
    };
    resendCode(payload)
      .then((resendResult) => {
        if (resendResult.data.status === 200) {
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
      }).finally(() => {
        context.showLoader(false);
      });
  };

  return (
    <>
      <Stack spacing={3}>
        <Stack spacing={3}>
          <CustomizedInput
            placeholder='Entrer le code'
            label='Code'
            type='number'
            onChange={(e) => {
              setCode(e.target.value);
              validate({ 'code': e.target.value })
            }}
            {...(errors.code && {
              error: true,
              helpertext: errors.code,
            })}
          />
          <CustomizedButton text='Verifier' onClick={onSubmit} />
        </Stack>
        <CustomizedButton text='Renvoyer le code' onClick={onSubmitResend} />

      </Stack>
    </>
  );
};
export default VerifyCodeForm;
