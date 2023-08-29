import React from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { requestAPI } from '../api/requests';
import { useCustomContext } from '../components/customContexts';
import urls from '../api/urls';
import {
    Button,
    Container,
    Typography,
} from '@mui/material';

const ResetEmail = () => {
    const { userInfo, setSnackbarStatus } = useCustomContext();
    const [cookies, ] = useCookies(['accesstoken', 'refreshtoken']);
    const { handleSubmit } = useForm();

    const postEmail = (data) => {
        data.email = userInfo.email
        const param = {
            data: data,
            request: data,
            accesstoken: cookies.accesstoken,
            url: urls.ResetEmail
        }

        const request = new requestAPI(param);
        return request.post();
    }

    const onSubmit = (data) => {
        postEmail(data)
            .then(res => {
                console.log(res)
                console.log("メール送信完了");
                setSnackbarStatus({
                    open: true,
                    severity: "success",
                    message: "メールを送信しました。"
                })
            })
            .catch(err => {
                setSnackbarStatus({
                    open: true,
                    severity: "error",
                    message: `メール送信に失敗しました。(code:${err.response.status})`
                })
            });
    }
    return (
        <div>
            <Typography variant='body1'>
                アカウントに登録されているメールアドレス宛に変更用リンクを送信します。
            </Typography>
            <Container maxWidth="xs">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        sx={{ mt: 3, mb: 2 }}
                        size='large'
                    >
                        メールアドレスを変更
                    </Button>
                </form>
            </Container>
        </div>
    )
}

export default ResetEmail;