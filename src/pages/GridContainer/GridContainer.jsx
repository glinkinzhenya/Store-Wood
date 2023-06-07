import React from 'react';
// import { Grid } from '@mui/material';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './GridContainer.css';

export default function GridContainer({ children }) {
  return (
    <div className='GridTemplate'>
      {/* <Grid container> */}
        {/* <Grid item xs={12} md={12} lg={12}> */}
          <Header />
        {/* </Grid> */}
        {/* <Grid item xs={12} sm={12} md={12} lg={12}> */}
          {children}
        {/* </Grid> */}
        {/* // <Grid item xs={12} md={12} lg={12}> */}
          <Footer />
        {/* </Grid> */}
      {/* </Grid> */}
    </div>
  );
}
