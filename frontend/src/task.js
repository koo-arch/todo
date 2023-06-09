import React from 'react';
import { getTaskList } from './api/requests';
import Cookies from 'universal-cookie';

const task = () => {
    const cookie = new Cookies;
    const accesstoken = cookie.get('accesstoken');

    getTaskList(accesstoken)
        .then(function(response) {
            console.log(response.data)
        })
        .catch(err => {
            console.log("miss")
        })

  return (
    <div>task</div>
  );
};

export default task;