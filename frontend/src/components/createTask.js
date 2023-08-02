import React, { useContext, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useForm, Controller } from 'react-hook-form';
import CustomModal from './customModal';
import { requestAPI, requestData } from '../api/requests';
import urls from '../api/urls';
import { PostFlag } from '../pages/task';
import { 
    Box,
    Container,
    Button,
    TextField,
    Typography,
    Grid,
    Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DateTimeField from './dateTimeField';

const CreateTask = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['accesstoken', 'refreshtoken']);
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const { postFlag, setPostFlag } = useContext(PostFlag);
    const openRef = useRef();
    const closeRef = useRef();

    const openModal = () => openRef.current.click();
    const closeModal = () => closeRef.current.click();


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
                alert('タスク登録完了');
                setPostFlag(!postFlag);
                closeModal();
            })
            .catch(err => {
                console.log(err.response);
            })
    }
    return (
    <div>
        <Fab color="primary" onClick={openModal}><AddIcon fontSize='large'/></Fab>
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
                        タスク登録
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
                            rows={3}
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
                                    登録
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

export default CreateTask;