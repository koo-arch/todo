import React from 'react';
import { getTaskList } from './api/requests';

const task = (props) => {
    const accesstoken = props.token
    console.log(accesstoken)
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