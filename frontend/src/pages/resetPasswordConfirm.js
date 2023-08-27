import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { requestAPI, requestData } from '../api/requests';
import CustomSnackbar from '../components/customSnackbar';
import PasswordField from '../components/passwordField';
import { Contexts } from '../App';
import urls from '../api/urls';
import {
    Button,
    Box,
    Container,
    Typography,
    Avatar,
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

const ResetPasswordConfirm = () => {
    const navigation = useNavigate();
    const { uid, token } = useParams();
    const { snackbarStatus, setSnackbarStatus } = useContext(Contexts);
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();

    const postNewPassword = (data) => {
        data.uid = uid;
        data.token = token;
        const requestJson = new requestData(data);

        const param = {
            data: data,
            request: requestJson.newPassword(),
            url: urls.ResetPasswordConfirm
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
                navigation('/login');
            })
            .catch(err => {
                const errRes = err.response.data
                console.log(err.response.data)
                setSnackbarStatus({
                    open: true,
                    severity: "error",
                    message: `パスワード変更に失敗しました。再度やり直してください。(code:${err.response.status})`
                })
                navigation('/password/reset');
            });
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
                        <LockResetIcon />
                    </Avatar>
                    <Typography component={"h1"} variant='h5'>
                        新しいパスワードの設定
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <PasswordField
                            required
                            error={!!errors.password}
                            margin="normal"
                            fullWidth
                            label="パスワード"
                            helperText={!!errors.password && errors.password.message}
                            {...register('password', {
                                required: "パスワードを入力してください",
                                minLength: { value: 8, message: `8文字以上で入力してください。` },
                            })
                            }
                        />
                        <PasswordField
                            required
                            error={!!errors.passwordConfirmation}
                            margin="normal"
                            fullWidth
                            label="パスワード(確認)"
                            helperText={!!errors.passwordConfirmation && errors.passwordConfirmation.message}
                            {...register('passwordConfirmation', {
                                required: "パスワードを再入力してください",
                                validate: (value) => {
                                    return (
                                        value === getValues('password') || "パスワードが一致しません"
                                    )
                                }
                            })
                            }
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            送信
                        </Button>
                    </form>
                </Box>
            </Container>
            <CustomSnackbar {...snackbarStatus} />
        </>
    )
}

export default ResetPasswordConfirm;