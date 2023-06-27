import React from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { postNewTask } from '../api/requests';

const CreateTask = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['accesstoken', 'refreshtoken']);
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit  = (data) => {
        console.log(data)
        postNewTask(data, cookies.accesstoken)
            .then(res => {
                console.log(res)
                console.log('新規タスク登録');
                alert('タスク登録完了');
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
    </div>
    )
}

export default CreateTask;