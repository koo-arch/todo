import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { requestAPI, requestData } from '../api/requests';
import urls from '../api/urls';
import { 
    Button, 
    Box, 
    Container, 
    CssBaseline, 
    Typography,
    TextField,
    Avatar,
    Grid,
    Link
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Login = (props) => {
    const defaultTheme = createTheme();
    const navigation = useNavigate();

    const [movie, setMoive] = useState([]);
    const [cookies, setCookie] = useCookies(['accesstoken', 'refreshtoken']);
    const { register, handleSubmit, watch, errors } = useForm();

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
        postLogin(data)
            .then(res => {
                setCookie('accesstoken', res.data.access, { path: '/' }, { httpOnly: true })
                setCookie('refreshtoken', res.data.refresh, { path: '/' }, { httpOnly: true })
                navigation('/todo');
            })
            .catch(err => {
                console.log(err.response.data)
                setMoive(err.response.data)
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
                            margin='normal'
                            fullWidth
                            label="メールアドレス"
                            type="email"
                            {...register('email')}
                        />
                        <TextField
                            required
                            margin='normal'
                            fullWidth
                            label="パスワード"
                            type="password"
                            {...register('password')}/>
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            ログイン
                        </Button>
                    </Box>
                    {movie.detail}
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                パスワードを忘れた
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="register" variant="body2">
                                新規登録はこちら
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;