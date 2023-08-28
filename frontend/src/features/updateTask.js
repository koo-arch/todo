import React, { useContext, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { requestAPI, requestData } from '../api/requests';
import FormDialog from './formDialog';
import { Contexts } from '../App';
import { TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DateTimeField from '../components/dateTimeField';

const UpdateTask = (props) => {
    const { url, id, task_name, comment, deadline, iconSize, size } = props;
    const [cookies, ] = useCookies(['accesstoken', 'refreshtoken'])
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const { postFlag, setPostFlag, setSnackbarStatus } = useContext(Contexts);
    const openRef = useRef();
    const closeRef = useRef();

    const openDialog = () => openRef.current.click();
    const closeDialog = () => closeRef.current.click();

    const putTask = (data) => {
        const requestJson = new requestData(data);

        const param = {
            data: data,
            request: requestJson.task(),
            accesstoken: cookies.accesstoken,
            url: url
        }

        const request = new requestAPI(param);
        return request.put();
    }

    const onSubmit = (data) => {
        putTask(data)
            .then(res => {
                console.log(res)
                setSnackbarStatus({
                    open: true,
                    severity: "success",
                    message: "変更が完了しました。"
                });
                setPostFlag(!postFlag);
                closeDialog();
            })
            .catch(err => {
                console.log(err.response)
                setSnackbarStatus({
                    open: true,
                    severity: "error",
                    message: `変更に失敗しました。(code:${err.response.status})`,
                });
            })
    }
    return(
        <div>
            <IconButton color='primary' size={size} onClick={openDialog}>
                <EditIcon sx={iconSize} />
            </IconButton>
            <FormDialog
                open={openRef}
                close={closeRef}
                title="タスク編集"
                buttonText="変更"
            >
                <form id="form" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" value={id} {...register('id')}/>
                    <TextField
                        required
                        error={!!errors.task_name}
                        margin='normal'
                        defaultValue={task_name}
                        fullWidth
                        label="タスク名"
                        helperText={!!errors.task_name && errors.task_name.message}
                        {...register('task_name', { required: "タスク名を入力してください" })}
                    />
                    <TextField
                        multiline
                        rows={5}
                        fullWidth
                        margin="normal"
                        defaultValue={comment}
                        label="コメント"
                        {...register('comment')}
                    />
                    <Controller
                        name="deadline"
                        control={control}
                        defaultValue={new Date(deadline)}
                        rules={{
                            required: "期限を入力してください"
                        }}
                        render={({ field: { value, onChange } }) => <DateTimeField value={value} onChange={onChange} />}
                    />
                </form>
            </FormDialog>
        </div>
    )
}

export default UpdateTask;