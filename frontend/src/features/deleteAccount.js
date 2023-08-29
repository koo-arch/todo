import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { requestAPI } from '../api/requests';
import FormDialog from './formDialog';
import PasswordField from '../components/passwordField';
import { useCustomContext } from '../components/customContexts';
import useLogout from '../hooks/useLogout';
import urls from '../api/urls';
import { Button, Container, DialogContentText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteAccount = () => {
    const [cookies,] = useCookies(['accesstoken', 'refreshtoken']);
    const { register, handleSubmit, clearErrors, setError, formState: { errors } } = useForm();
    const { setSnackbarStatus } = useCustomContext();
    const logout = useLogout();
    const openRef = useRef();
    const closeRef = useRef();

    const openDialog = () => openRef.current.click();
    const closeDialog = () => closeRef.current.click();

    const deleteAccount = (data) => {
        const param = {
            data: data,
            request: data,
            accesstoken: cookies.accesstoken,
            url: urls.UserInfo
        }

        
        const request = new requestAPI(param);

        console.log("Delete Request Options:", {
            url: request.url,
            data: request.request,
            headers: request.headers()
        });
        return request.deleteAccount()
    }

    const onSubmit = (data) => {
        clearErrors();
        deleteAccount(data)
            .then(res => {
                console.log(res)
                console.log('削除完了')
                closeDialog();
                logout();
                setSnackbarStatus({
                    open: true,
                    severity: "success",
                    message: "アカウント削除が完了しました。"
                });
            })
            .catch(err => {
                console.log(err.response)
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
                        setError(`${key}`, { type: "validate", message: newMessages })
                        return setError;
                    })
                } else {
                    setError('current_password', { type: "validate", message: "パスワードが違います" })
                }
                setSnackbarStatus({
                    open: true,
                    severity: "error",
                    message: `アカウント削除に失敗しました。(code:${err.response.status})`,
                });
            })
    }
    return (
        <div>
            <Typography variant='body1'>
                アカウントとデータをすべて削除します。
            </Typography>
            <Container maxWidth="xs">
                <Button
                    startIcon={<DeleteIcon/>}
                    variant='contained'
                    color="error"
                    size="large"
                    fullWidth
                    onClick={openDialog}
                    sx={{ mt: 3, mb: 2 }}
                >
                    アカウント削除
                </Button>
            </Container>
            <FormDialog
                open={openRef}
                close={closeRef}
                title="アカウント削除"
                buttonText="削除"
                color="error"
            >
                <form id="dialogform" onSubmit={handleSubmit(onSubmit)}>
                    <DialogContentText color="error">
                        アカウントとデータを全て削除します。
                        よろしいですか？
                    </DialogContentText>
                    <PasswordField
                        required
                        error={!!errors.current_password}
                        margin='normal'
                        fullWidth
                        label="パスワード"
                        helperText={!!errors.current_password && errors.current_password.message}
                        {...register('current_password', { required: "パスワードを入力してください" })} 
                    />
                </form>
            </FormDialog>
        </div>
    )
}

export default DeleteAccount;