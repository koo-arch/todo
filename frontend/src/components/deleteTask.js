import React, { useState, useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { requestAPI, requestData } from '../api/requests';
import CustomModal from './customModal';
import FormDialog from './formDialog';
import { Contexts } from '../App';
import { Box, Button, IconButton, Grid, Container, Typography, List, ListItem, ListItemText, DialogContentText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteTask = (props) => {
    const { url, id, task_name, comment, deadline, iconSize, size } = props;
    const [cookies, ] = useCookies(['accesstoken', 'refreshtoken'])
    const { register, handleSubmit } = useForm();
    const { postFlag, setPostFlag, setSnackbarStatus } = useContext(Contexts);
    const openRef = useRef();
    const closeRef = useRef();

    const openDialog = () => openRef.current.click();
    const closeDialog = () => closeRef.current.click();

    const deleteTask = (data) => {
        const requestJson = new requestData(data);
 
        const param = {
            data: data,
            request: requestJson.task(),
            accesstoken: cookies.accesstoken,
            url: url
        }

        const request = new requestAPI(param);
        return request.delete()
    }

    const onSubmit = (data) => {
        deleteTask(data)
            .then(res => {
                console.log(res)
                console.log('削除完了')
                setSnackbarStatus({
                    open: true,
                    severity: "success",
                    message: "削除が完了しました。"
                });
                setPostFlag(!postFlag);
                closeDialog();
            })
            .catch(err => {
                console.log(err.response)
                setSnackbarStatus({
                    open: true,
                    severity: "error",
                    message: `削除に失敗しました。(code:${err.response.status})`,
                });
            })
    }
    return (
        <div>
            <IconButton color="error" size={size} onClick={openDialog}>
                <DeleteIcon sx={iconSize}/>
            </IconButton>
            <FormDialog 
                open={openRef}
                close={closeRef}
                title="タスク削除"
                buttonText="削除"
                color="error"
            >
                <form id="form" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" value={id} {...register('id')} />
                    <DialogContentText>以下の項目を削除してよろしいですか？</DialogContentText>
                    <List>
                        <ListItem>
                            <ListItemText
                                primaryTypographyProps={{ noWrap: true }}
                                primary="タスク名"
                                secondary={task_name}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primaryTypographyProps={{ noWrap: true }}
                                primary="コメント"
                                secondary={comment}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primaryTypographyProps={{ noWrap: true }}
                                primary="期限"
                                secondary={deadline}/>
                        </ListItem>
                    </List>
                </form>
            </FormDialog>
        </div>
    )
}

export default DeleteTask;