import React, { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { requestAPI } from '../api/requests';
import { Contexts } from '../App';
import Loading from './loading';

const GetTask = ({ displayComponent: DisplayComponent, url }) => {
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
    const { postFlag } = useContext(Contexts);
    const [isLoading, setIsLoading] = useState(true);
    

    const getTaskList = () => {
        const param = {
            accesstoken: cookies.accesstoken,
            url: url
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
            .then(() => {
                setIsLoading(false);
            })
    },[postFlag])

  return (
    <div>
        {isLoading ? 
        <Loading open={isLoading}/>
        : 
        <DisplayComponent task={taskList}/>
        }
    </div>
  );
};

export default GetTask;