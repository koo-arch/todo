import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <button onClick={removeJWT}>ログアウト</button>
        </div>
    )
}

export default Logout;