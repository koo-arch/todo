import React from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { requestAPI, requestData } from '../api/requests';
import { useCustomContext } from '../components/customContexts';
import urls from '../api/urls';
import CustomSnackbar from '../components/customSnackbar';
import { 
    Button, 
    Box, 
    Container, 
    CssBaseline, 
    Typography,
    TextField,
    Avatar,
    Grid,
} from "@mui/material";
import CustomLink from '../components/CustomLink';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PasswordField from '../components/passwordField';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Login = () => {
    const defaultTheme = createTheme();
    const navigation = useNavigate();
    const { snackbarStatus } = useCustomContext();
    const [cookies, setCookie] = useCookies(['accesstoken', 'refreshtoken']);
    const { register, handleSubmit, clearErrors, setError, formState: { errors } } = useForm();

    const postLogin = (data) => {
        const requestJson = new requestData(data);
    
        const param = {
            data: data,
            request: requestJson.auth(),
            url: urls.Login
        }
    
        const request = new requestAPI(param);
        return request.post();
    }


    const getJwt = (data) => {
        clearErrors();
        postLogin(data)
            .then(res => {
                setCookie('accesstoken', res.data.access, { path: '/' }, { httpOnly: true })
                setCookie('refreshtoken', res.data.refresh, { path: '/' }, { httpOnly: true })
                navigation('/task');
            })
            .catch(err => {
                const errRes = err.response.data
                console.log(err.response.status)
                if (errRes.detail === undefined) {
                    // 各項目にエラーをセット
                    Object.keys(errRes).map((key) => {
                        const messages = errRes[`${key}`]
                        const newMessages = [];
                        
                        // メッセージ内のスペースを削除
                        for (let i = 0; i < messages.length; i++) {
                            newMessages[i] = messages[i].replace(/ /g, "")
                        }
                        setError(`${key}`, { type: "validate", message: newMessages})
                        return setError;
                    })
                } else {
                    setError('email', { type: "validate", message: "メールアドレスかパスワードが違います" })
                    setError('password', { type: "validate", message: "メールアドレスかパスワードが違います" })
                }
            });
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component={"main"} maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component={"h1"} variant='h5'>
                        ログイン
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(getJwt)} sx={{ mt: 1 }}>
                        <TextField
                            required
                            error={!!errors.email}
                            margin='normal'
                            fullWidth
                            label="メールアドレス"
                            type="email"
                            helperText={!!errors.email && errors.email.message}
                            {...register('email', {required: "メールアドレスを入力してください"})}
                        />
                        <PasswordField
                            required
                            error={!!errors.password}
                            margin='normal'
                            fullWidth
                            label="パスワード"
                            helperText={!!errors.password && errors.password.message}
                            {...register('password', { required: "パスワードを入力してください"})}/>
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            ログイン
                        </Button>
                    </Box>
                    <Grid container>
                        <Grid item xs>
                            <CustomLink to="/password/reset" variant="body2">
                                パスワードを忘れた
                            </CustomLink>
                        </Grid>
                        <Grid item>
                            <CustomLink to="/register" variant="body2">
                                新規登録はこちら
                            </CustomLink>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <CustomSnackbar {...snackbarStatus}/>
        </ThemeProvider>
    );
};

export default Login;