import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Top from './pages/top';
import Login from './pages/login';
import Register from './pages/register';
import Task from './pages/task';
import Finished from './pages/finished';
import NotFound from './notFound';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const Contexts = createContext();

const App = () => {
  const defaultTheme = createTheme();
  const [isRedirect, setIsRedirect] = useState(false);
  const [postFlag, setPostFlag] = useState(false);
  const value = { 
    isRedirect, 
    setIsRedirect,
    postFlag,
    setPostFlag,
   };
  const [cookies, ] = useCookies(['accesstoken', 'refreshtoken']);
  const isTokenExist = !!cookies.accesstoken && !!cookies.refreshtoken
  console.log(isTokenExist)
  return(
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline/>
      <BrowserRouter>
        <Contexts.Provider value={value}>
          <Routes>
            <Route path='/' element={ !isTokenExist ? <Top/> : <Navigate replace to='/task'/>}/>
            <Route path='/login' element={ !isTokenExist ? <Login/> : <Navigate replace to='/task'/>}/>
            <Route path='/register' element={ !isTokenExist ? <Register/> : <Navigate replace to='/task'/> }/>
            <Route path='/task' element={ isTokenExist ? <Task /> : <Navigate replace to='/login' />}/>
            <Route path='/finished' element={ isTokenExist ? <Finished /> : <Navigate replace to='/login' />}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Contexts.Provider>
      </BrowserRouter>
    </ThemeProvider>
  )
}


export default App;
