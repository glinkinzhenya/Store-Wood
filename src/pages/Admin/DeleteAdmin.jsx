import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const DeleteAdmin = () => {
    const handleDelete = () => {
        localStorage.removeItem('auth');
        window.location.href = '/';
    };

    return (
        <>
            <Link to={'/setting'}>
            <Button
                sx={{
                    position: 'fixed',
                    zIndex: '99',
                    right: '20px',
                    bottom: '80px',
                    backgroundColor: 'black',
                    fontSize: '20px',
                    color: '#F07C00',
                    '&:hover': {
                        backgroundColor: '#2c2a28', // Изменение цвета при наведении на кнопку
                    },
                }}
                >До кабінету
                </Button>
            </Link>
            <Button
                sx={{
                    position: 'fixed',
                    zIndex: '100',
                    right: '20px',
                    bottom: '20px',
                    backgroundColor: 'black',
                    fontSize: '20px',
                    color: '#F07C00',
                    '&:hover': {
                        backgroundColor: '#2c2a28', // Изменение цвета при наведении на кнопку
                    },
                }}
                onClick={handleDelete}
            >
                Вийти з Адміністратора
            </Button>
        </>
    );
};

export default DeleteAdmin;
