import React from 'react';
import './CatalogProducts.css';

export default function CatalogProducts() {

  return (
    <div className='catalogProducts'>
      <div className='catalogProducts-container container'>
        <h2 className='catalogProducts__title'>Каталог продукции</h2>
        <div className='catalogProducts__box'>
          <div className='catalogProducts__box-item'>Односпальные кровати</div>
          <div className='catalogProducts__box-item'>Двухспальные кровати</div>
          <div className='catalogProducts__box-item'>Кровати домиком</div>
          <div className='catalogProducts__box-item'>Двухъярусные кровати</div>
          <div className='catalogProducts__box-item'>Кровати с третьим выездным спальным</div>
          <div className='catalogProducts__box-item'>Установка кровати у клиента</div>
        </div>
      </div>

    </div>

  );
}
