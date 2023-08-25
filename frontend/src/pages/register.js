import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { requestAPI, requestData } from "../api/requests";
import urls from "../api/urls";
import { Contexts } from "../App";
import CustomSnackbar from "../components/customSnackbar";
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
    const { snackbarStatus, setSnackbarStatus } = useContext(Contexts);
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
                navigation('/login');
                setSnackbarStatus({
                    open: true,
                    severity: "success",
                    message: "ユーザー登録が完了しました。"
                })
            })
            .catch(err => {
                const errRes = err.response.data
                console.log(errRes);
                // 各項目にエラーをセット
                Object.keys(errRes).map((key) => {
                    const messages = errRes[`${key}`]
                    const newMessages = new Array();

                    // メッセージ内のスペースを削除
                    for (let i = 0; i < messages.length; i++) {
                        newMessages[i] = messages[i].replace(/ /g, "")
                    }
                    setError(`${key}`, { type: "validate", message: newMessages})
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
            <CustomSnackbar {...snackbarStatus}/>
        </ThemeProvider>
    );
};

export default Register;