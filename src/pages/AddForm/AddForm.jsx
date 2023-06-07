import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid } from '@mui/material';
import { InputText } from '../../components/Forms/InputText';
import { addFormRules } from '../../constans/rules';
import './AddForm.css';

export default function AddForm() {
  const dayRef = useRef(null);
  const timeRef = useRef(null);
  const valueRef = useRef(null);
  const [days, setResult] = useState({});

  const handleSubmitTwo = (event) => {
    event.preventDefault();

    const obj = { ...days };
    const day = dayRef.current.value;
    const time = timeRef.current.value;
    // eslint-disable-next-line prefer-destructuring
    const value = valueRef.current.value;
    if (Object.keys(obj[day] || {}).length === 0 && value === '') {
      return;
    }
    if (!obj[day]) {
      obj[day] = {};
    }

    obj[day][time] = value;
    setResult(obj);
    dayRef.current.value = '';
    timeRef.current.value = '';
    valueRef.current.value = '';
  };

  const { control, handleSubmit, getValues } = useForm();

  const putForm = async () => {
    await fetch('https://64148167e8fe5a3f3a087de9.mockapi.io/api/v1/classes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: getValues().name,
        image: getValues().image,
        fullInfo: getValues().fullInfo,
        gallery: [getValues().image_1, getValues().image_2, getValues().image_3, getValues().image_4],
        days,
      }),
    });
    window.location.href = '/trainings';
  };

  return (
    <>
      <div className='add-form-wrapper'>
        <form className='add-form' onSubmit={handleSubmitTwo}>
          <h3>Додаєм ссилку на зображення, заповнюємо день, час та кількість вільних місць, якщо в цей день ще є додаткові часи то повторюємо той самий день та пишемо інщі часи.</h3>
          <InputText
            control={control}
            name='name'
            label='Назва тренування'
            rules={addFormRules.login}
          />
          <InputText
            control={control}
            name='image'
            label='Логотип'
            rules={addFormRules.image}
          />
          <InputText
            control={control}
            name='fullInfo'
            label='Опис тренування'
            rules={addFormRules.description}
          />
          <InputText
            control={control}
            name='image_1'
            label='Зображення 1'
            rules={addFormRules.image}
          />
          <InputText
            control={control}
            name='image_2'
            label='Зображення 2'
            rules={addFormRules.image}
          />
          <InputText
            control={control}
            name='image_3'
            label='Зображення 3'
            rules={addFormRules.image}
          />
          <InputText
            control={control}
            name='image_4'
            label='Зображення 4'
            rules={addFormRules.image}
          />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputText
                control={control}
                name='day'
                label='День'
                variant='outlined'
                fullWidth
                inputRef={dayRef}
                rules={addFormRules.day}
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                control={control}
                label='Час'
                name='time'
                variant='outlined'
                fullWidth
                inputRef={timeRef}
                rules={addFormRules.time}
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                control={control}
                rules={addFormRules.place}
                name='place'
                label='Кількість місць'
                variant='outlined'
                fullWidth
                inputRef={valueRef}
                type='number'
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' type='submit'>
                Додати день
              </Button>
            </Grid>
            <Grid item xs={12}>
              <pre>{JSON.stringify(days, null, 2)}</pre>
            </Grid>
          </Grid>
          <Button
            disabled={Object.keys(days).length === 0}
            variant='contained'
            size='large'
            onClick={handleSubmit(putForm)}
          >Відправити на сервер
          </Button>
        </form>
      </div>
    </>
  );
}
