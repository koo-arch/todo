import React, { useState, useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { requestAPI, requestData } from '../api/requests';
import CustomModal from './customModal';
import urls from '../api/urls';
import { PostFlag } from '../pages/task';
import { Box, Button, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteTask = (task) => {
    const [cookies, ] = useCookies(['accesstoken', 'refreshtoken'])
    const { register, handleSubmit } = useForm();
    const {postFlag, setPostFlag} = useContext(PostFlag);
    const openRef = useRef();
    const closeRef = useRef();

    const openModal = () => openRef.current.click();
    const closeModal = () => closeRef.current.click();

    const deleteTask = (data) => {
        const requestJson = new requestData(data);
 
        const param = {
            data: data,
            request: requestJson.task(),
            accesstoken: cookies.accesstoken,
            url: urls.TaskList
        }

        const request = new requestAPI(param);
        return request.delete()
    }

    const onSubmit = (data) => {
        deleteTask(data)
            .then(res => {
                console.log(res)
                console.log('削除完了')
                setPostFlag(!postFlag);
                closeModal();
            })
            .catch(err => {
                console.log(err.response)
            })
    }
    return (
        <div>
            <IconButton color="error" onClick={openModal}>
                <DeleteIcon/>
            </IconButton>
            <CustomModal open={openRef} close={closeRef}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" value={task.id} {...register('id')} />
                    <p>この項目を削除してよろしいですか？</p>
                    <p>タスク名：{task.task_name}</p>
                    <p>コメント：{task.comment}</p>
                    <p>期限：{task.deadline}</p>
                    <Grid container sx={{ mt: 3, mb: 2 }}>
                        <Grid item xs>
                            <Button
                                variant="outlined"
                                onClick={closeModal}
                            >
                                閉じる
                            </Button>
                        </Grid>
                        <Grid>
                            <Button
                                color="error"
                                variant="contained"
                                type="submit"
                            >
                                削除
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </CustomModal>
        </div>
    )
}

export default DeleteTask;