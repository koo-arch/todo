import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { Header } from './Header';
import { Top } from './Top';
import { Register } from './Register';
import { Todo } from './Todo';

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
