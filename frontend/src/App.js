import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './Header';
import { Home } from './top';
import { Register } from './Register';
import { Login } from './Login';
import { Todo } from './Todo';

const App = () => {
  return(
    <>
      <Router>
        <Header/>
        <>
          <Switch>

          </Switch>
        </>
      </Router>
    </>
  )
}


export default App;
