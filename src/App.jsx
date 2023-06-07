import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainRoute from './pages/MainRoute';
import { Context } from './Contex';
import { firestore } from './firebase';
import DeleteButton from './pages/Admin/DeleteAdmin';

export default function App() {

  const [cartItems2, setCartItems2] = useState([]);

  const [data2, setData] = useState(null);

  useEffect(() => {
    firestore.collection("data").get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setData(data);
      })
      .catch((error) => {
        // Обработка ошибок
        console.log("Ошибка получения данных из Firestore:", error);
        throw error;
      });
  }, []);
  const mainData = data2;

  const hasAuth = localStorage.getItem('auth') !== null;

  return (
    <Context.Provider value={{ mainData, cartItems2, setCartItems2 }}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<MainRoute />} />
        </Routes>
        {hasAuth && <DeleteButton />}
      </BrowserRouter>
    </Context.Provider>
  );
}
