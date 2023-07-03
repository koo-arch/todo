import React, { useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { requestAPI, requestData } from '../api/requests';
import urls from '../api/urls';
import GetTask from './getTask';
import { PostFlag } from './task';

const CreateTask = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['accesstoken', 'refreshtoken']);
    const { register, handleSubmit, watch, errors } = useForm();
    const { postFlag, setPostFlag } = useContext(PostFlag);

    const postNewTask = (data) => {
        const requestJson = new requestData(data);

        const param = {
            data: data,
            request: requestJson.task(),
            accesstoken: cookies.accesstoken,
            url: urls.TaskList
        }

        const request = new requestAPI(param);
        return request.post()
    }

    const onSubmit  = (data) => {
        console.log(data)
        postNewTask(data)
            .then(res => {
                console.log(res)
                console.log('新規タスク登録');
                alert('タスク登録完了');
                setPostFlag(!postFlag);
            })
            .catch(err => {
                console.log(err.response);
            })
    }
    return (
    <div>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>タスク</label>
                <input {...register('task_name')}/>
                <label>詳細</label>
                <input {...register('text')}/>
                <input type="submit" value="追加"/>
            </form>
        </div>
        <GetTask/>
    </div>
    )
}

export default CreateTask;