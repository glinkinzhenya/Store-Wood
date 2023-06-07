import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export function InputText({
  control,
  name,
  defaultValue = '',
  label,
  rules,
  ...props
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={(({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <TextField
   
          InputLabelProps={{
            style: {
              color: '#F07C00', // цвет текста метки
            },
          }}
          type='text'
          label={label}
          value={value}
          inputRef={ref}
          onChange={onChange}
          margin='normal'
          error={error}
          helperText={error ? error.message : ''}
          {...props}
        />
      ))}
    />
  );
}
