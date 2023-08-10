import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { requestAPI, requestData } from '../api/requests';
import { Contexts } from '../App';
import { Box, Button } from '@mui/material';

const FinishButton = (props) => {
    const [cookies,] = useCookies(['accesstoken', 'refreshtoken']);
    const { register, handleSubmit } = useForm();
    const { postFlag, setPostFlag } = useContext(Contexts);

    const putIsFinished = (data) => {
        const requestJson = new requestData(data);

        const param = {
            data: data,
            request: requestJson.isFinished(),
            accesstoken: cookies.accesstoken,
            url: props.url
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
            <input type="hidden" value={props.id} {...register('id')} />
            <input type="hidden" value={props.task_name} {...register('task_name')} />
            <input type="hidden" value={props.comment} {...register('comment')} />
            <input type="hidden" value={props.deadline} {...register('deadline')} />
            <input type="hidden" value={!props.is_finished} {...register('is_finished')} />
            <Button 
                type='submit' 
                variant='contained'
                size='small'
                sx={{
                    borderRadius: '100vh'
                }}
            >
                {props.buttonText}
            </Button>
        </Box>
    )
}

export default FinishButton;