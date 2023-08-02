import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Top from './pages/top';
import Login from './pages/login';
import Register from './pages/register';
import Task from './pages/task';
import NotFound from './notFound';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const Redirect = createContext();

const App = () => {
  const defaultTheme = createTheme();
  const [isRedirect, setIsRedirect] = useState(false);
  const value = { isRedirect, setIsRedirect };
  const [cookies, setCookie, removeCookie] = useCookies(['accesstoken', 'refreshtoken']);
  const cookiesLength = Object.values(cookies).length
  console.log(cookiesLength)
  return(
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline/>
      <BrowserRouter>
        <Redirect.Provider value={value}>
          <Routes>
            <Route path='/' element={ !cookiesLength ? <Top/> : <Navigate replace to='/task'/>}/>
            <Route path='/login' element={ !cookiesLength ? <Login/> : <Navigate replace to='/task'/>}/>
            <Route path='/register' element={ !cookiesLength ? <Register/> : <Navigate replace to='/task'/> }/>
            <Route path='/task' element={ cookiesLength ? <Task /> : <Navigate replace to='/login' />}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Redirect.Provider>
      </BrowserRouter>
    </ThemeProvider>
  )
}


export default App;
