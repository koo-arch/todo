import React, { useContext, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { requestAPI, requestData } from '../api/requests';
import CustomModal from './customModal';
import urls from '../api/urls';
import { PostFlag } from '../pages/task';
import {
    Box,
    Container,
    Button,
    TextField,
    Typography,
    Grid,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DateTimeField from './dateTimeField';

const UpdateTask = (task) => {
    const [cookies, ] = useCookies(['accesstoken', 'refreshtoken'])
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const {postFlag, setPostFlag} = useContext(PostFlag);
    const openRef = useRef();
    const closeRef = useRef();

    const openModal = () => openRef.current.click();
    const closeModal = () => closeRef.current.click();


    const putTask = (data) => {
        const requestJson = new requestData(data);

        const param = {
            data: data,
            request: requestJson.task(),
            accesstoken: cookies.accesstoken,
            url: urls.TaskList
        }

        const request = new requestAPI(param);
        return request.put();
    }

    const onSubmit = (data) => {
        putTask(data)
            .then(res => {
                console.log(res)
                console.log('変更完了')
                setPostFlag(!postFlag);
                closeModal();
            })
            .catch(err => {
                console.log(err.response)
            })
    }
    return(
        <div>
            <IconButton color='primary' onClick={openModal}>
                <EditIcon/>
            </IconButton>
            <CustomModal open={openRef} close={closeRef}>
                <Container component={"div"} maxWidth="xs">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component={"h1"} variant='h5' sx={{ mt: 2 }}>
                            タスク編集
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                            <input type="hidden" value={task.id} {...register('id')}/>
                            <TextField
                                required
                                error={!!errors.task_name}
                                margin='normal'
                                defaultValue={task.task_name}
                                fullWidth
                                label="タスク名"
                                helperText={!!errors.task_name && errors.task_name.message}
                                {...register('task_name', { required: "タスク名を入力してください" })}
                            />
                            <TextField
                                multiline
                                rows={3}
                                fullWidth
                                margin="normal"
                                defaultValue={task.comment}
                                label="コメント"
                                {...register('comment')}
                            />
                            <Controller
                                name="deadline"
                                control={control}
                                defaultValue={new Date(task.deadline)}
                                rules={{
                                    required: "期限を入力してください"
                                }}
                                render={({ field: { value, onChange } }) => <DateTimeField value={value} onChange={onChange} />}
                            />
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
                                        variant="contained"
                                        type="submit"
                                    >
                                        更新
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </CustomModal>
        </div>
    )
}

export default UpdateTask;