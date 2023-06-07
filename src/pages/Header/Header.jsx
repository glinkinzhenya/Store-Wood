import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../Contex';
import Burger from './ComponentHeader/Burger/Burger';
import BasicMenu from './ComponentHeader/BasicMenu/BasicMenu';
import { Button, CircularProgress, Snackbar, ThemeProvider, createTheme } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { InputText } from '../../components/Forms/InputText';
import { addFormRules } from '../../constans/rules';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import './Header.css';

export default function Header() {
  const [busketNumber, setBusketNumber] = useState(0);
  const [busket, setBusket] = useState([]);
  const { cartItems2 } = useContext(Context);

  useEffect(() => {
    const loadCartItems = async () => {
      const cartItems = await localStorage.getItem("cartItems");
      if (cartItems) {
        setBusketNumber(JSON.parse(cartItems).length);
      }
    };
    loadCartItems();
  }, []);

  const [busketNumberCorrect, setBusketNumberCorrect] = useState(0);

  useEffect(() => {
    setBusketNumberCorrect(cartItems2.length)
    setBusketNumber(busketNumber + cartItems2.length - busketNumberCorrect)
  }, [cartItems2]);

  const [isPulseButtonActive, setIsPulseButtonActive] = useState(false);

  const handlePulseButtonClick = () => {
    setIsPulseButtonActive(!isPulseButtonActive);
  };

  const pulseButtonImageClasses = `pulse-button-image ${isPulseButtonActive ? 'rotate opacity-image' : ''}`;
  const pulseButtonImage2Classes = `pulse-button-image2 ${isPulseButtonActive ? '' : 'opacity-image rotate '}`;
  const pulseButtonIconClasses = `pulse-button-icon ${isPulseButtonActive ? '' : 'pulse-button-icon_bottom opacity-image'}`;
  const headerBlack = `header-black ${isPulseButtonActive ? 'header-black__active' : ''}`;


  const [productWindow, setProductWindow] = useState(false);

  const countDuplicates = (arr, value) => {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].title === value) {
        count++;
      }
    }
    return count;
  };

  const touchProduct = () => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      const parsedCartItems = JSON.parse(cartItems);
      const uniqueItems = Array.from(new Set(parsedCartItems.map((item) => item.title)));

      const basketItems = uniqueItems.map((title) => {
        const quantity = countDuplicates(parsedCartItems, title);
        const item = parsedCartItems.find((item) => item.title === title);
        const total = item.price * quantity; // Вычисление суммы для каждого товара
        return { ...item, quantity, total };
      });

      setBusket(basketItems);
    }
    setProductWindow(true);
  };

  const increaseQuantity = (index) => {
    const updatedBasket = [...busket];
    updatedBasket[index].quantity += 1;
    updatedBasket[index].total = updatedBasket[index].quantity * updatedBasket[index].price;
    setBusket(updatedBasket);
    updateLocalStorage(updatedBasket); // Обновляем данные в локальном хранилище
    setBusketNumber(busketNumber + 1);
  };
  // кнопка минус
  const decreaseQuantity = (index) => {
    const updatedBasket = [...busket];
    if (updatedBasket[index].quantity > 1) {
      updatedBasket[index].quantity -= 1;
      updatedBasket[index].total = updatedBasket[index].quantity * updatedBasket[index].price;
      setBusket(updatedBasket);
      updateLocalStorage(updatedBasket); // Обновляем данные в локальном хранилище
      setBusketNumber(busketNumber - 1);
    }
  };

  const removeItem = (index) => {
    const updatedBasket = [...busket];
    const item = updatedBasket[index];

    // Удаляем все копии товара из корзины
    const updatedBasketWithoutItem = updatedBasket.filter((basketItem) => basketItem.title !== item.title);
    setBusket(updatedBasketWithoutItem);

    // Удаляем все копии товара из локального хранилища
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      const parsedCartItems = JSON.parse(cartItems);
      const updatedCartItems = parsedCartItems.filter((cartItem) => cartItem.title !== item.title);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setBusketNumber(updatedCartItems.length);
    }
  };

  const updateLocalStorage = (updatedBasket) => {
    const cartItems = updatedBasket.reduce((items, item) => {
      for (let i = 0; i < item.quantity; i++) {
        items.push(item);
      }
      return items;
    }, []);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const calculateTotalAmount = () => {
    let total = 0;
    for (let i = 0; i < busket.length; i++) {
      total += busket[i].total;
    }
    return total;
  };


  const touchProductClose = () => {
    setProductWindow(false)
  };

  const { control, handleSubmit } = useForm();


  const handleConfirm = (data) => {
    const dataBusket = busket.map(obj => ({
      article: obj.article,
      name: obj.title,
      quantity: obj.quantity,
      price: obj.price
    }));

    setLoading(true); // Set loading state to true
    fetch('https://formspree.io/f/mbjebaod', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, ...dataBusket }),
    })
      .then(response => {
        if (response.ok) {
          setSuccessOpen(true);
          setProductWindow(false)
          localStorage.removeItem("cartItems");
          setBusket([]);
          setBusketNumber(0)
        } else {
          console.log('Ошибка отправки данных');
          console.log(data);
        }
        setLoading(false); // Set loading state back to false
      })
      .catch(error => {
        console.log('Ошибка отправки данных:', error);
        setLoading(false); // Set loading state back to false
      });
  };

  const [isLoading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#f07c00'
      },
    },
  });

  return (
    <div className='header'>
      {/* <div onClick={handlePulseButtonClick} className={headerBlack}></div> */}

      {/* <div className='header-contacts container'>
        <BasicMenu
          city="м. Запоріжжя"
          addresses={[
            { label: 'вул. Поштова 141-Е', url: 'https://goo.gl/maps/ci2DPZvv62PQytH9A' },
            { label: 'Бульвар Шевченка 16', url: 'https://goo.gl/maps/untzH82HCHdjzH4i7' },
          ]}
          phoneNumbers={['+380676120366', '+380981807080']}
        />
        <BasicMenu
          city="м. Лозова"
          addresses={[
            { label: 'вул. Богданівська 35', url: 'https://goo.gl/maps/hT7zgvGWuNVq3gEY8' }
          ]}
          phoneNumbers={['+380676132880']}
        />
        <BasicMenu
          city="м. Харків"
          addresses={[
            { label: 'вул. Різдвяна 21', url: 'https://goo.gl/maps/3bmo4t72UDWPVEzW7' }
          ]}
          phoneNumbers={['+380676121958']}
        />
        <BasicMenu
          city="м. Городок"
          addresses={[
            { label: 'вул. Грушевського 84/2', url: 'https://goo.gl/maps/pmMV6SjztNN585nq9' }
          ]}
          phoneNumbers={['+380974058748']}
        />
      </div> */}

      <div className='header-logo container'>

        <a className='header-logo__picture' href="/">
          <img className='header-logo__image' src="./img/logo-header.jpg" alt="logo-storewood" />
        </a>



        <nav className='header-category'>
          <a className='header-category__item action' href="/">Главная</a>
          <a className='header-category__item' href="/">Каталог</a>
          <a className='header-category__item' href="/s">Про нас</a>
          <a className='header-category__item' href="/">Портфолио</a>
          <a className='header-category__item' href="/">Отзывы</a>
          <a className='header-category__item' href="/">Контакты</a>
        </nav>

        <div className='header-logo__telephone'>
          <div className='header-language'>
            <a className='header-language__active' href="">UA</a>
            <a className='header-language__en' href="">EN</a>
            <a className='header-language__en' href="">DE</a>
          </div>
        </div>

        <div className='header-logo__burger'>
          {/* <div className='burger-search__picture'>
            <img className='burger-search__image' src="./img/logo-search.svg" alt="logo-telephone" />
          </div> */}
          {busketNumber > 0 ? <div onClick={touchProduct} className='burger-search__basket'>
            <img className='burger-search__basket-image' src="./img/logo-basket.svg" alt="logo-telephone" />
            <div className='burger-basket__number'>{busketNumber}</div>
          </div> :
            <div className='burger-search__basket'>
              <img className='burger-search__basket-image' src="./img/logo-basket.svg" alt="logo-telephone" />
            </div>}

          <Burger />
        </div>
      </div>



      <div onClick={handlePulseButtonClick} className="pulse-button">
        <img className={pulseButtonImageClasses} src="./img/chat.png" alt="" />
        <img className={pulseButtonImage2Classes} src="./img/image-icon.png" alt="" />

        <span className="pulse-button__rings"></span>
        <span className="pulse-button__rings"></span>
        <span className="pulse-button__rings"></span>
      </div>

      <div className={pulseButtonIconClasses}>
        <img className="pulse-button-icon_image" src="./img/instagram-color.png" alt="" />
        <img className="pulse-button-icon_image" src="./img/telegram-color.svg" alt="" />
        <img className="pulse-button-icon_image" src="./img/viber-color.svg" alt="" />
      </div>


      {productWindow && <div className='product-window__blur' onClick={touchProductClose}></div>}
      {productWindow && <div className='burger-basket'>
        <img onClick={touchProductClose} className='product-window__close' src="./img/close.png" alt="" />

        <div className='basket-form'>
          <h3 className='basket-form__title'>Ваші дані для замовлення</h3>
          <InputText
            sx={{ width: '90%' }}
            autoFocus
            margin="dense"
            label="ПІБ"
            type="text"
            variant="outlined"
            rules={addFormRules.name}
            control={control}
            name='name'
          />
          <InputText
            sx={{ width: '90%' }}
            autoFocus
            margin="dense"
            label="Ваш E-mail"
            type="text"
            variant="outlined"
            rules={addFormRules.mail}
            control={control}
            name='mail'
          />
          <InputText
            sx={{ width: '90%' }}
            autoFocus
            margin="dense"
            label="Ваш номер телефону"
            type="text"
            variant="outlined"
            rules={addFormRules.number}
            control={control}
            name='number'
          />

        </div>

        <div className='basket-products'>

          <div className='basket-products__name'>
            <div className='basket-products__title'>Товар</div>
            <div className='basket-products__title'>Кількість</div>
            <div className='basket-products__title'>Сума</div>
          </div>

          <div className="basket-map">

            {busket.map((item, index) => (
              <div key={index} className="basket-products__box">
                <div className="basket-item">
                  <div className="basket-item__picture">
                    <img className="basket-item__img" src={item.img[0]} alt={item.img[0]} />
                  </div>
                  <div className="basket-item__title">{item.title}</div>
                </div>
                <div className="basket-item__actions">
                  <RemoveIcon sx={{ cursor: 'pointer' }} onClick={() => decreaseQuantity(index)}>-</RemoveIcon>
                  <div className='basket-item__quantity'>{item.quantity}</div>
                  <AddIcon sx={{ cursor: 'pointer' }} onClick={() => increaseQuantity(index)}>+</AddIcon>
                </div>
                <div className='basket-item__total'>{item.total} <span className='basket-item__total-span'>UAH</span></div>
                <DeleteForeverIcon sx={{ width: '60px', cursor: 'pointer' }} onClick={() => removeItem(index)}>Удалить</DeleteForeverIcon>
              </div>
            ))}


          </div>

          <div className="basket-summ-button">
            <div className="total-amount">Загальна сума: {calculateTotalAmount()} <span className='basket-item__total-span'>UAH</span></div>
            {isLoading ? (
              <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CircularProgress size={24} color="secondary" />
                  <Button sx={{ backgroundColor: '#F07C00' }} disabled>Зробити замовлення</Button>
                </Box>
              </ThemeProvider>
            ) : (
              <Button onClick={handleSubmit(handleConfirm)} variant="contained" sx={{ backgroundColor: '#F07C00', '&:hover': { backgroundColor: '#F07C00', color: 'white !important' } }}>Зробити замовлення</Button>
            )}
          </div>
        </div>

      </div>}

      <Snackbar
        sx={{ BackgroundColor: 'black' }}
        open={successOpen}
        autoHideDuration={4000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert sx={{ сolor: 'black' }} elevation={6} variant="filled" onClose={handleSuccessClose} severity="success">
          Заявка отримана, скоро з Вами зв'яжемось.
        </MuiAlert>
      </Snackbar>
    </div >
  );
}
