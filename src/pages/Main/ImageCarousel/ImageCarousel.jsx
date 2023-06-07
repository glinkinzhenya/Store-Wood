import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../Contex';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ImageCarousel.css';

export default function ImageCarousel() {

  const { mainData } = useContext(Context);
  const [mainData2, setMainData] = useState([]);

  useEffect(() => {
    if (mainData) {
      setMainData(mainData[0].carousel);
    }
  });

  return (
    <div className='imageCarousel'>
      <div className='image-carousel__bootstrap'>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
          <div className="carousel-indicators">


            {mainData2.map((item, index) => (
              (index === 0) ? <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                : <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} aria-label={index + 1}></button>
            ))}

          </div>
          <div className="carousel-inner">

            {mainData2.map((item, index) => (
              (index === 0) ?
                <div key={index} className="carousel-item active image-carousel__picture">
                  <img src={item} className="d-block image-carousel__img" alt="..." />
                  {/* <div className="carousel-caption d-none d-md-block">
                    <h5 className='carousel-item__title'>{item.title}</h5>
                    <p className='carousel-item__description'>{item.description}</p>
                  </div> */}
                </div> :
                <div key={index} className={`carousel-item image-carousel__picture`}
                >
                  <img src={item} className="d-block image-carousel__img" alt="..." />
                  {/* <div className="carousel-caption d-none d-md-block">
                    <h5 className='carousel-item__title'>{item.title}</h5>
                    <p className='carousel-item__description'>{item.description}</p>
                  </div> */}
                </div>
            ))}

          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='image-carousel__bg'></div>
    </div>
  );
}