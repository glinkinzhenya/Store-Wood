import React from 'react';
import { auth } from '../../firebase';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { InputText } from '../../components/Forms/InputText';
import { adminRules } from '../../constans/rules';
import './Admin.css';

export default function Admin() {
  const { control, handleSubmit, getValues } = useForm();

  const onSubmit = async () => {
    try {
      const { login, password } = getValues();
      await auth.signInWithEmailAndPassword(login, password);
      localStorage.setItem('auth', 'true');
      window.location.href = '/setting';
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
    }
  };


  return (
    <div className='admin'>
      <div className='form-wrapper'>
        <InputText
          control={control}
          name='login'
          label='Логін'
          type='text'
          rules={adminRules.login}
        />
        <InputText
          control={control}
          name='password'
          label='Пароль'
          type='password'
          rules={adminRules.password}
        />
        <Button
          sx={{ color: '#F07C00' }}
          size='large'
          onClick={handleSubmit(onSubmit)}
        >Війти
        </Button>
      </div>
    </div>
  );
}
