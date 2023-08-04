import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { requestAPI, requestData } from '../api/requests';
import urls from '../api/urls';
import { PostFlag } from '../pages/task';
import { Box, Button, Fab } from '@mui/material';

const FinishButton = (task) => {
    const [cookies,] = useCookies(['accesstoken', 'refreshtoken']);
    const { register, handleSubmit } = useForm();
    const { postFlag, setPostFlag } = useContext(PostFlag);

    const putIsFinished = (data) => {
        const requestJson = new requestData(data);

        const param = {
            data: data,
            request: requestJson.isFinished(),
            accesstoken: cookies.accesstoken,
            url: urls.TaskList
        }

        const request = new requestAPI(param);
        return request.put();
    }

    const onSubmit = (data) => {
        console.log(data)
        putIsFinished(data)
            .then(res => {
                alert('タスク完了');
                console.log(res.data)
                setPostFlag(!postFlag);
            })
            .catch(err => {
                console.log(err.response.data);
            })
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" value={task.id} {...register('id')} />
            <input type="hidden" value={task.task_name} {...register('task_name')} />
            <input type="hidden" value={task.comment} {...register('comment')} />
            <input type="hidden" value={task.deadline} {...register('deadline')} />
            <input type="hidden" value={!task.is_finished} {...register('is_finished')} />
            <Button 
                type='submit' 
                variant='contained'
                size='small'
                sx={{
                    borderRadius: '100vh'
                }}
            >
                完了
            </Button>
        </Box>
    )
}

export default FinishButton;