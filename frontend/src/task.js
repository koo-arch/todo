import React, { useState, useEffect } from 'react';
import { getTaskList } from './api/requests';
import TaskDetail from './taskDetail';

const Task = (props) => {
    const accesstoken = props.token
    console.log(accesstoken)

    const initialState = {
        id: '',
        task_name: '',
        text: '',
    }

    const [taskList, setTaskList] = useState(initialState);

    useEffect(() => {
        getTaskList(accesstoken)
            .then(res => {
                setTaskList(res.data);
                console.log(res);
            })
            .catch(err => {
                console.log("miss")
            })
    },[])

  return (
    <div>
        {Object.values(taskList).map(res => <TaskDetail {...res}/>)}
    </div>
  );
};

export default Task;