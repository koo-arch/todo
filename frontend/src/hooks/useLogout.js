import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const navigation = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();

    const removeJWT = () => {
        removeCookie('accesstoken', { path: '/'}, {httpOnly: true});
        removeCookie('refreshtoken', { path: '/'}, {httpOnly: true});
        navigation('/');
        console.log('ログアウト');
        console.log(cookies);
    }
    return removeJWT;
}

export default useLogout;