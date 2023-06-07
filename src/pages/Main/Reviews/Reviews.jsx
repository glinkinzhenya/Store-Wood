import React from 'react';
import './Reviews.css';

export default function Reviews() {

  return (
    <div className='reviews'>
      <div className='reviews-container container'>
        <h2 className='reviews__title'>Отзывы</h2>
        <div className='reviews__box'>

          <div className='reviews__box-item'></div>
          <div className='reviews__box-item'></div>
          <div className='reviews__box-item'></div>
          <div className='reviews__box-item'></div>
        </div>
      </div>
    </div>
  );
}
