import React from 'react';
import './Portfolio.css';

export default function Portfolio() {

  return (
    <div className='portfolio'>
      <div className='portfolio-container container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <div className='portfolio__box'>

          <div className='portfolio__box-item'>
            <img className='portfolio__box-image' src="https://kubuk-moebel.de/wp-content/uploads/2020/09/emilka-scaled.jpg" alt="" />
          </div>

          <div className='portfolio__box-item'>
            <img className='portfolio__box-image' src="https://kubuk-moebel.de/wp-content/uploads/2020/09/emilka-scaled.jpg" alt="" />
          </div>

          <div className='portfolio__box-item'>
            <img className='portfolio__box-image' src="https://kubuk-moebel.de/wp-content/uploads/2020/09/emilka-scaled.jpg" alt="" />
          </div>
          
          <div className='portfolio__box-item'>
            <img className='portfolio__box-image' src="https://kubuk-moebel.de/wp-content/uploads/2020/09/emilka-scaled.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
