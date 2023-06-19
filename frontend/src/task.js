import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getTaskList } from './api/requests';
import TaskDetail from './taskDetail';

const Task = (props) => {
    const initialState = {
        id: '',
        task_name: '',
        text: '',
    }

    const [taskList, setTaskList] = useState(initialState);
    const [cookies, setCookie] = useCookies(['accesstoken', 'refreshtoken'])

    useEffect(() => {
        getTaskList(cookies.accesstoken)
            .then(res => {
                setTaskList(res.data);
                console.log(res);
            })
            .catch(err => {
                console.log(err.response)
            })
    },[])

  return (
    <div>
        {Object.values(taskList).map(res => <TaskDetail {...res}/>)}
    </div>
  );
};

export default Task;