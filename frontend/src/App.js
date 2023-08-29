import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ContextProvider } from './components/customContexts';
import Top from './pages/top';
import Login from './pages/login';
import Register from './pages/register';
import Task from './pages/task';
import Finished from './pages/finished';
import Account from './pages/account';
import ResetPassword from './pages/resetPassword';
import ResetPasswordConfirm from './pages/resetPasswordConfirm';
import ResetEmailConfirm from './pages/resetEmailConfirm';
import NotFound from './notFound';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const App = () => {
  const defaultTheme = createTheme();
   
  const [cookies, ] = useCookies(['accesstoken', 'refreshtoken']);
  const isTokenExist = !!cookies.accesstoken && !!cookies.refreshtoken
  console.log(isTokenExist)
  return(
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline/>
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            <Route path='/' element={ !isTokenExist ? <Top/> : <Navigate replace to='/task'/>}/>
            <Route path='/login' element={ !isTokenExist ? <Login/> : <Navigate replace to='/task'/>}/>
            <Route path='/register' element={ !isTokenExist ? <Register/> : <Navigate replace to='/task'/> }/>
            <Route path='/task' element={ isTokenExist ? <Task /> : <Navigate replace to='/login' />}/>
            <Route path='/finished' element={ isTokenExist ? <Finished /> : <Navigate replace to='/login' />}/>
            <Route path='/account' element={ isTokenExist ? <Account /> : <Navigate replace to='/login' />}/>
            <Route path='/password/reset' element={ !isTokenExist ? <ResetPassword /> : <Navigate replace to='/task' />}/>
            <Route path='/password/reset/confirm/:uid/:token' element={ !isTokenExist ? <ResetPasswordConfirm /> : <Navigate replace to='/task' />}/>
            <Route path='/email/reset/confirm/:uid/:token' element={ isTokenExist ? <ResetEmailConfirm /> : <Navigate replace to='/login' />}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}


export default App;
