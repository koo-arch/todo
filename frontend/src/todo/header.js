import React, { useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Logout from '../auth/logout';
import { requestAPI, requestData } from '../api/requests';
import urls from '../api/urls';

const Header = () => {
  const initialState = {
    id: '',
    email: '',
  }

  const [userInfo, setUserInfo] = useState(initialState)
  const [cookies, setCookie, removeCookie] = useCookies(['accesstoken', 'refreshtoken']);

  const getUserInfo = () => {
    const param = {
      accesstoken: cookies.accesstoken,
      url: urls.UserInfo
    }
  
    const request = new requestAPI(param);
    return request.get();
  }


  useEffect(() => {
    getUserInfo()
      .then(res => {
        console.log(res)
        setUserInfo(res.data)
      })
      .catch(e => {
        console.log(e)
      })
    },[]);
  
  return (
    <>
      <Logout/>
      {userInfo.email}
    </>
  );
};

export default Header;