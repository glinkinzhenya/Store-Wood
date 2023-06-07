import React from 'react';
import CallBack from '../../components/CallBack/CallBack';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="contacts" className='footer container'>
      <div className='footer-primary'>
        <div className='footer-left'>
          <div className='footer-left__picture'>
            <a href="/">
              <img className='footer-left__image' src="./img/logo-spetsvik.svg" alt="" />
            </a>
          </div>
          <div className='footer-left__text'>StoreWood - мебельный магазин</div>
        </div>
        <div className='footer-catalog'>
          <div className='footer-catalog__title'>Каталог продукции</div>
          <a className='footer-catalog__item' href="/h">Односпальные кровати</a>
          <a className='footer-catalog__item' href="/">Двухспальные кровати</a>
          <a className='footer-catalog__item' href="/">Кровати домиком</a>
          <a className='footer-catalog__item' href="/">Двухъярусные кровати</a>
          <a className='footer-catalog__item' href="/">Кровати с третьим выездным спальным</a>
          <a className='footer-catalog__item' href="/">Установка кровати у клиента</a>
        </div>

        <div className='footer-info'>
          <div className='footer-info__title'>Інфо</div>
          <a className='footer-info__item' href="/">Головна</a>
          <a className='footer-info__item' href="/">Каталог</a>
          <a className='footer-info__item' href="/">Про нас</a>
          <a className='footer-info__item' href="/">Портфолио</a>
          <a className='footer-info__item' href="/">Отзывы</a>
          <a className='footer-info__item' href="/">Контакти</a>
        </div>
      </div>

      <div className='footer-secondary'>
        <div className='footer-secondary__social'>
          <a href='https://www.facebook.com'>
            <img className='footer-secondary__social-image' src='./img/facebook.png' alt='' />
          </a>
          <a href='https://www.instagram.com'>
            <img className='footer-secondary__social-image' src='./img/instagram.png' alt='' />
          </a>
        </div>

        <div className='footer-secondary__telephone'>
          {/* <a className='footer-secondary__telephone-link' href="">
          <img className='footer-secondary__telephone-image' src="./img/logo-telephone.svg" alt="" />
                099 000 11 22
          </a> */}
          <CallBack buttonText="Ми Вам зателефонуємо" dialogTitle="Введіть Ваш номер телефону та коментар" dialogText="Ми зателефонуємо як найшвідше та відповемо на всі ваші питання" confirmText="Надіслати" cancelText="Відміна" from="звідки - 'Головна сторінка'" fontSize="12px" />
          <div className='footer-secondary__telephone-grafic'>Працюємо: Пн-Пт: 8:30-15:30</div>
        </div>

        <div className='footer-secondary__info'>© StoreWood – 2023.</div>


      </div>

    </footer>
  );
}
