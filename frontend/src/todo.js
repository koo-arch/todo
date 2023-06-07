import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './logout';
import Cookies from 'universal-cookie';

const todo = () => {
  const cookies = new Cookies();
  console.log(cookies.get('accesstoken'))
  console.log(cookies.get('refreshtoken'))
  return (
    <div>
      <Logout />
    </div>
  );
};

export default todo;