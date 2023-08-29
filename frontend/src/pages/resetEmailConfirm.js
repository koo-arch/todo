import React from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { requestAPI, requestData } from '../api/requests';
import CustomSnackbar from '../components/customSnackbar';
import { useCustomContext } from '../components/customContexts';
import urls from '../api/urls';
import {
    Button,
    Box,
    Container,
    Typography,
    Avatar,
    TextField
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

const ResetEmailConfirm = () => {
    const navigation = useNavigate();
    const [cookies,] = useCookies(['accesstoken', 'refreshtoken']);
    const { uid, token } = useParams();
    const { snackbarStatus, setSnackbarStatus } = useCustomContext();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const postNewPassword = (data) => {
        data.uid = uid;
        data.token = token;
        const requestJson = new requestData(data);

        const param = {
            data: data,
            request: requestJson.newEmail(),
            accesstoken: cookies.accesstoken,
            url: urls.ResetEmailConfirm
        }

        const request = new requestAPI(param);
        return request.post();
    }

    const onSubmit = (data) => {
        postNewPassword(data)
            .then(res => {
                console.log(res)
                console.log("メール送信完了");
                setSnackbarStatus({
                    open: true,
                    severity: "success",
                    message: "パスワード変更が完了しました。"
                })
                navigation('/account');
            })
            .catch(err => {
                const errRes = err.response.data
                console.log(err.response.data)
                setSnackbarStatus({
                    open: true,
                    severity: "error",
                    message: `パスワード変更に失敗しました。再度やり直してください。(code:${err.response.status})`
                })
            })
    }
    return (
        <>
            <Container component={"main"} maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <EmailIcon />
                    </Avatar>
                    <Typography component={"h1"} variant='h5'>
                        新しいメールアドレスの設定
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            required
                            error={!!errors.email}
                            margin='normal'
                            fullWidth
                            label="メールアドレス"
                            type="email"
                            helperText={!!errors.email && errors.email.message}
                            {...register('email', { required: "メールアドレスを入力してください" })}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            変更
                        </Button>
                    </form>
                </Box>
            </Container>
            <CustomSnackbar {...snackbarStatus} />
        </>
    )
}

export default ResetEmailConfirm;