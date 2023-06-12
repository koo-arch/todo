import React from 'react';
import { Link } from 'react-router-dom';
import Task from './task';
import Header from './header';

const todo = () => {
  return (
    <div>
      <Header/>
      <Task/>
    </div>
  );
};

export default todo;