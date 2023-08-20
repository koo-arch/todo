import React, { useContext, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useForm, Controller } from 'react-hook-form';
import FormDialog from './formDialog';
import { requestAPI, requestData } from '../api/requests';
import urls from '../api/urls';
import { Contexts } from '../App';
import { TextField, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DateTimeField from './dateTimeField';
import '../styles/styles.css';

const CreateTask = (props) => {
    const { create } = props;
    const [cookies, ] = useCookies(['accesstoken', 'refreshtoken']);
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const { postFlag, setPostFlag, setSnackbarStatus } = useContext(Contexts);
    const openRef = useRef();
    const closeRef = useRef();

    const openDialog = () => openRef.current.click();
    const closeDialog = () => closeRef.current.click();


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
                setSnackbarStatus({
                    open: true,
                    severity: "success",
                    message: "タスク登録が完了しました。"
                })
                setPostFlag(!postFlag);
                closeDialog();
            })
            .catch(err => {
                console.log(err.response);
                setSnackbarStatus({
                    open: true,
                    severity: "error",
                    message: `タスク登録に失敗しました。(code:${err.response.status})`,
                });
            })
    }
    return (
    <div>
        <div className='fab-container'>
            <Fab color="primary" onClick={openDialog} ref={create}>
                <AddIcon fontSize='large'/>
            </Fab>
        </div>
        <FormDialog 
            open={openRef}
            close={closeRef}
            title="タスク登録"
            buttonText="登録"
        >
            <form id="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    required
                    error={!!errors.task_name}
                    margin='normal'
                    fullWidth
                    label="タスク名"
                    helperText={!!errors.task_name && errors.task_name.message}
                    {...register('task_name', { required: "タスク名を入力してください"})}
                />
                <TextField
                    multiline
                    rows={5}
                    fullWidth
                    margin="normal"
                    label="コメント"
                    {...register('comment')}
                />
                <Controller
                    name="deadline"
                    control={control}
                    defaultValue={new Date()}
                    rules={{
                        required: "期限を入力してください"
                    }}
                    render={({ field: { value, onChange } }) => <DateTimeField value={value} onChange={onChange}/>}
                />
            </form>
        </FormDialog>
    </div>
    )
}

export default CreateTask;