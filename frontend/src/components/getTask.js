import React, { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import TaskDetail from './taskDetail';
import { requestAPI } from '../api/requests';
import urls from '../api/urls';
import { PostFlag } from '../pages/task';
import Loading from './loading';

const GetTask = () => {
    const initialState = [{
        id: 0,
        task_name: '',
        comment: '',
        created_at: '',
        updated_at: '',
        deadline: '',
        is_finished: '',
    }]
    
    const [taskList, setTaskList] = useState(initialState);
    const [cookies, ] = useCookies(['accesstoken', 'refreshtoken']);
    const { postFlag } = useContext(PostFlag);
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
        <TaskDetail task={taskList}/>
    </div>
  );
};

export default GetTask;