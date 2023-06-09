import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './logout';
import Task from './task';
import Cookies from 'universal-cookie';
import Redirect from './redirectToTop';
import { config } from './api/requests';

const todo = () => {
  const cookie = new Cookies();
  const token = cookie.get('accesstoken');
  console.log(config(cookie.get('accesstoken')));
  Redirect(token);
  return (
    <div>
      <Logout />
      <Task/>
    </div>
  );
};

export default todo;