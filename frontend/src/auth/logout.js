import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Box, MenuItem } from '@mui/material';

const Logout = (props) => {
    const navigation = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();

    const removeJWT = () => {
        removeCookie('accesstoken', { path: '/'}, {httpOnly: true});
        removeCookie('refreshtoken', { path: '/'}, {httpOnly: true});
        navigation('/');
        console.log('ログアウト');
        console.log(cookies);
    }
    return (
        <>
            <MenuItem {...props} onClick={removeJWT}>ログアウト</MenuItem>
        </>
    )
}

export default Logout;