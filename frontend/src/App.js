import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Header from './header.js';
import Top from './top.js';
import Register from './register.js';
import Todo from './todo.js';

const App = () => {
  return(
    <>
      <BrowserRouter>
        <Header/>
        <>
          <Routes>
            <Route path='/' element={<Top/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/todo' element={<Todo/>}/>
          </Routes>
        </>
      </BrowserRouter>
    </>
  )
}


export default App;
