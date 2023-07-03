import React, { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import TaskDetail from './taskDetail';
import CreateTask from './createTask';
import { requestAPI, requestData } from '../api/requests';
import urls from '../api/urls';
import { PostFlag } from './task';

const GetTask = (props) => {
    const initialState = {
        id: '',
        task_name: '',
        text: '',
        date: '',
    }

    const [taskList, setTaskList] = useState(initialState);
    const [cookies, setCookie] = useCookies(['accesstoken', 'refreshtoken']);
    const { postFlag, setPostFlag } = useContext(PostFlag);

    const getTaskList = () => {
        const param = {
            accesstoken: cookies.accesstoken,
            url: urls.TaskList
        }
    
        const request = new requestAPI(param)
        return request.get()

    }


    useEffect(() => {
        getTaskList()
            .then(res => {
                setTaskList(res.data);
                console.log(res);
            })
            .catch(err => {
                console.log(err.response)
            })
    },[postFlag])

  return (
    <div>
        {Object.values(taskList).map((task, index) => <TaskDetail {...task} key={index}/>)}
    </div>
  );
};

export default GetTask;