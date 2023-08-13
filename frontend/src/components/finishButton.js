import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { requestAPI, requestData } from '../api/requests';
import { Contexts } from '../App';
import { Box, Button } from '@mui/material';

const FinishButton = (props) => {
    const [cookies,] = useCookies(['accesstoken', 'refreshtoken']);
    const { register, handleSubmit } = useForm();
    const { postFlag, setPostFlag, setSnackbarStatus } = useContext(Contexts);

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
                console.log(res.data);
                setSnackbarStatus({
                    open: true,
                    severity: "success",
                    message: props.message
                });
                setPostFlag(!postFlag);
            })
            .catch(err => {
                console.log(err.response.data);
                setSnackbarStatus({
                    open: true,
                    severity: "error",
                    message: `タスク処理に失敗しました。(code:${err.response.status})`,
                });
            })
    }

    return (
        <div>
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
        </div>
    )
}

export default FinishButton;