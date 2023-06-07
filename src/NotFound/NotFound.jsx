import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <>
      <h3 className='not_found'>Помилка 404</h3>

      <button className='not_found_button'>
        <Link
          to={'/trainings'}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >Перейти на головну...
        </Link>
      </button>
    </>
  );
}
