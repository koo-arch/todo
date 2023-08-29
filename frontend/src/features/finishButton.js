import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { requestAPI, requestData } from '../api/requests';
import { useCustomContext } from '../components/customContexts';
import { Button } from '@mui/material';

const FinishButton = (props) => {
    const { url, message, id, task_name, comment, deadline, is_finished, buttonText } = props;
    const [cookies,] = useCookies(['accesstoken', 'refreshtoken']);
    const { register, handleSubmit } = useForm();
    const { postFlag, setPostFlag, setSnackbarStatus } = useCustomContext();

    const putIsFinished = (data) => {
        const requestJson = new requestData(data);

        const param = {
            data: data,
            request: requestJson.isFinished(),
            accesstoken: cookies.accesstoken,
            url: url
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
                    message: message
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" value={id} {...register('id')} />
                <input type="hidden" value={task_name} {...register('task_name')} />
                <input type="hidden" value={comment} {...register('comment')} />
                <input type="hidden" value={deadline} {...register('deadline')} />
                <input type="hidden" value={!is_finished} {...register('is_finished')} />
                <Button 
                    type='submit' 
                    variant='contained'
                    size='small'
                    sx={{
                        borderRadius: '100vh'
                    }}
                >
                    {buttonText}
                </Button>
            </form>
        </div>
    )
}

export default FinishButton;