import React, { useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Logout from './logout';
import { getUserInfo } from './api/requests';

const Header = () => {
  const initialState = {
    id: '',
    email: '',
  }

  const [userInfo, setUserInfo] = useState(initialState)
  const [cookies, setCookie, removeCookie] = useCookies(['accesstoken', 'refreshtoken']);

  useEffect(() => {
    getUserInfo(cookies.accesstoken)
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