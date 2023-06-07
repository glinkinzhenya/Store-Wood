import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';
import './CallBack.css';

export default function CallBack(props) {
  const { buttonText, dialogTitle, dialogText, confirmText, cancelText, fontSize, from } = props;
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formName, setformName] = useState('');
  const [formText, setformText] = useState('');
  const [formMail, setformMail] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };

  const handleConfirm = () => {
    setLoading(true); // Set loading state to true
    fetch('https://formspree.io/f/mbjebaod', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formName, phoneNumber, formText, formMail, from }),
    })
      .then(response => {
        if (response.ok) {
          setSuccessOpen(true);
        } else {
          console.log('Ошибка отправки данных');
        }
        setLoading(false); // Set loading state back to false
        handleClose();
      })
      .catch(error => {
        console.log('Ошибка отправки данных:', error);
        setLoading(false); // Set loading state back to false
        handleClose();
      });
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleformNameChange = (event) => {
    setformName(event.target.value);
  };

  const handleformTextChange = (event) => {
    setformText(event.target.value);
  };

  const handleformMailChange = (event) => {
    setformMail(event.target.value);
  };

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#f07c00'
      },
    },
  });

  return (
    <div className='callBack'>
      <Button sx={{ width: '100%', color: '#F07C00', borderColor: '#F07C00', ':hover': { borderColor: 'white' } }} variant="outlined" onClick={handleClickOpen}>
        <Typography sx={{ fontSize }} color="white">{buttonText}</Typography>
      </Button>
      <Dialog sx={{ backdropFilter: 'blur(10px)' }} open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogText}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Ім'я"
            type="text"
            fullWidth
            variant="outlined"
            value={formName}
            onChange={handleformNameChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Пошта"
            type="text"
            fullWidth
            variant="outlined"
            value={formMail}
            onChange={handleformMailChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Номер"
            type="number"
            fullWidth
            variant="outlined"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Коментар"
            type="text"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={formText}
            onChange={handleformTextChange}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'black' }} onClick={handleClose}>{cancelText}</Button>
          {isLoading ? (
            <ThemeProvider theme={theme}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={24} color="secondary" />
                <Button sx={{ color: '#F07C00', marginLeft: 1 }} disabled>
                  {confirmText}
                </Button>
              </Box>
            </ThemeProvider>
          ) : (
            <Button sx={{ color: '#F07C00' }} onClick={handleConfirm}>{confirmText}</Button>
          )}
        </DialogActions>
      </Dialog>
      <Snackbar
        sx={{ BackgroundColor: 'black' }}
        open={successOpen}
        autoHideDuration={4000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert sx={{ сolor: 'black' }} elevation={6} variant="filled" onClose={handleSuccessClose} severity="success">
          Ми отримали повідомлення, скоро з Вами зв'яжемось.
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
