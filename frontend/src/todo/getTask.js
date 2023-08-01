import React, { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import TaskDetail from './taskDetail';
import { requestAPI, requestData } from '../api/requests';
import urls from '../api/urls';
import { PostFlag } from './task';
import Loading from './loading';

const GetTask = () => {
    const initialState = {
        id: '',
        task_name: '',
        comment: '',
        created_at: '',
        updated_at: '',
        deadline: '',
    }

    const [taskList, setTaskList] = useState(initialState);
    const [cookies, setCookie] = useCookies(['accesstoken', 'refreshtoken']);
    const { postFlag, setPostFlag } = useContext(PostFlag);
    const [isLoading, setIsLoading] = useState(false);
    

    const getTaskList = () => {
        const param = {
            accesstoken: cookies.accesstoken,
            url: urls.TaskList
        }
    
        const request = new requestAPI(param)
        return request.get()
    }


    useEffect(() => {
        setIsLoading(true);
        getTaskList()
            .then(res => {
                setTaskList(res.data);
                console.log(res);
            })
            .catch(err => {
                console.log(err.response)
            })
            .then(() => {
                setIsLoading(false);
            })
    },[postFlag])

  return (
    <div>
        <Loading open={isLoading}/>
        {Object.values(taskList).map((task, index) => <TaskDetail {...task} key={index}/>)}
    </div>
  );
};

export default GetTask;