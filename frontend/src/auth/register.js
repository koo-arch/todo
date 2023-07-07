import React, {useState, useEffect} from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { requestAPI, requestData } from "../api/requests";
import urls from "../api/urls";
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
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { ThemeProvider, createTheme } from "@mui/material/styles";


const Register = () => {
    const navigation = useNavigate();
    const [cookie, setCookie] = useCookies(['accesstoken', 'refreshtoken']);
    const { register, handleSubmit, getValues, clearErrors, setError, formState: { errors }, } = useForm();
    const defaultTheme = createTheme();


    const postRegister = (data) => {
        const requestJson = new requestData(data);

        const param = {
            data: data,
            request: requestJson.auth(),
            url: urls.Register
        }

        const request = new requestAPI(param);
        return request.post();
    }

    
    const onSubmit = (data) => {
        clearErrors();
        postRegister(data)
            .then(res =>  {
                console.log(res.data)
                alert('登録が完了しました');
                navigation('/login');
            })
            .catch(err => {
                const errRes = err.response.data
                console.log(errRes);
                Object.keys(errRes).map((key) => {
                    setError(`${key}`, { type: "validate", message: errRes[`${key}`]})
                })
            });
    };
    return(
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
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <HowToRegOutlinedIcon/>
                    </Avatar>
                    <Typography component={"h1"} variant='h5'>
                        新規登録
                    </Typography>
                    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            required
                            error={!!errors.email}
                            margin="normal"
                            fullWidth
                            label="メールアドレス"
                            type="email"
                            helperText={!!errors.email && errors.email.message}
                            {...register('email', { required: "メールアドレスを入力してください" })}
                        />
                        <TextField
                            required
                            error={!!errors.password}
                            margin="normal"
                            fullWidth
                            label="パスワード"
                            type="password"
                            helperText={!!errors.password && errors.password.message}
                            {...register('password', {
                                required: "パスワードを入力してください",
                                minLength: { value: 8, message: `8文字以上で入力してください。` },})
                            }
                        />
                        <TextField
                            required
                            error={!!errors.passwordConfirmation}
                            margin="normal"
                            fullWidth
                            label="パスワード(確認)"
                            type="password"
                            helperText={!!errors.passwordConfirmation && errors.passwordConfirmation.message}
                            {...register('passwordConfirmation', {
                                required: "パスワードを再入力してください",
                                validate: (value) => {
                                    return (
                                        value === getValues('password') || "パスワードが一致しません"
                                    )}
                                })
                            }
                            />
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            登録
                        </Button>
                    </Box>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="login" variant="body2">
                                アカウントをお持ちの場合
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Register;