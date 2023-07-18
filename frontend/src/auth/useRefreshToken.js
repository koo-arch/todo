import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import urls from '../api/urls';


const useRefreshToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigation = useNavigate();

  const refresh = async () => {
    // cookieに保存されたrefresh_tokenを送付してaccess_tokenを取得する
    try {
      const response = await axios.post(urls.Refresh, {
        refresh: cookies.refreshtoken,
      });
      setCookie('accesstoken', response.data.access, { path: '/' }, { httpOnly: true });
      console.log(response)
      return response.data.access;
    } catch {
      removeCookie('accesstoken', { path: '/' }, { httpOnly: true });
      removeCookie('refreshtoken', { path: '/' }, { httpOnly: true });
      navigation('/');
    }
  };

  return refresh;
};

export default useRefreshToken;
