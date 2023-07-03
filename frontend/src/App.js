import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Top from './top';
import Login from './auth/login';
import Register from './auth/register';
import Todo from './todo/todo';
import NotFound from './notFound';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['accesstoken', 'refreshtoken']);
  const cookiesLength = Object.values(cookies).length
  console.log(cookiesLength)
  return(
    <>
      <BrowserRouter>
        <>
          <Routes>
            <Route path='/' element={ !cookiesLength ? <Top/> : <Navigate replace to='/todo'/>}/>
            <Route path='/login' element={ !cookiesLength ? <Login/> : <Navigate replace to='/todo'/>}/>
            <Route path='/register' element={ !cookiesLength ? <Register/> : <Navigate replace to='/todo'/> }/>
            <Route path='/todo' element={ cookiesLength ? <Todo/> : <Navigate replace to='/'/> }/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </>
      </BrowserRouter>
    </>
  )
}


export default App;
