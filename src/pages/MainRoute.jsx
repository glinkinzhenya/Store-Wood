import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Grid from './GridContainer/GridContainer';
import Main from './Main/Main';
// import News from './Main/News/News';
// import About from './Main/About/About';
// import Services from './Main/Services/Services';
// import Products from './Main/Products/Products';
// import Admin from './Admin/Admin';
// import Setting from './Admin/Setting/Setting';

export default function MainRoute() {
  return (
    <Grid>
      <Routes>
        <Route path='/' element={<Main />} />
        {/* <Route path='/admin' element={<Admin />} /> */}
        {/* <Route path='/setting' element={<Setting />} /> */}
        {/* <Route path='/about' element={<About />} /> */}
        {/* <Route path='/products' element={<Products />} /> */}

        {/* <Route path='/services' element={<Services />} /> */}





        {/* <Route path='/news' element={<News />} /> */}
        {/* <Route path='/admin/admin-test' element={<AdminTest />} /> */}
        {/* // /edit фиксированный элемент */}
        {/* <Route path='/trainings' element={<Trainings />} />
        <Route path='/trainers' element={<Trainers />} />
        <Route path='/admin' element={<Admin />} /> */}
        {/* /:name плавающий элемент */}
        {/* <Route path='/trainings/:name' element={<SportPage />} />
        <Route path='/*' element={<NotFound />} /> */}
      </Routes>
    </Grid>
  );
}
