import React from 'react';
import './Main.css';
import ImageCarousel from './ImageCarousel/ImageCarousel';
import CatalogProducts from './CatalogProducts/CatalogProducts';
import About from './About/About';
import CallUs from './CallUs/CallUs';
import Portfolio from './Portfolio/Portfolio';
import Reviews from './Reviews/Reviews';

export default function Main() {

  return (
    <main>
      <ImageCarousel />
      <CatalogProducts />
      <About />
      <CallUs />
      <Portfolio />
      <Reviews />
    </main>
  );
}
