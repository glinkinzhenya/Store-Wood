import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequireAdminAuth = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminAuth = async () => {
            try {
                // Проверяем наличие информации об авторизации в памяти браузера
                const isAuth = localStorage.getItem('auth');
                if (isAuth !== 'true') {
                    // Если пользователь не авторизован, перенаправляем на страницу входа
                    navigate('/admin');
                }
                // Здесь вы также можете добавить дополнительные проверки для уровня доступа администратора, если необходимо
            } catch (error) {
                console.error('Ошибка проверки аутентификации:', error);
            }
        };

        checkAdminAuth();
    }, [navigate]);

    return <>{children}</>;
};

export default RequireAdminAuth;
