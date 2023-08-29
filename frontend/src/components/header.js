import React, { useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { requestAPI } from '../api/requests';
import urls from '../api/urls';
import { useCustomContext } from './customContexts';
import useCustomAxios from '../hooks/useCustomAxios';
import TemporaryDrawer from './temporaryDrawer';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';

const Header = () => {
  const { userInfo, setUserInfo, setSnackbarStatus } = useCustomContext(); 
  const [cookies, ] = useCookies(['accesstoken', 'refreshtoken']);
  const logout = useLogout();
  const customAxios = useCustomAxios();
  const [anchorEl, setAnchorEl] = useState(null);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      .catch(err => {
        console.log(err)
        console.log(err.response.data)
        logout();
        setSnackbarStatus({
          open: true,
          severity: "error",
          message: `エラーが発生しました。再度ログインしてください。(code:${err.response.status})`,
        });
      })
    },[]);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <TemporaryDrawer user={userInfo.email}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ToDoリスト
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to={"/account"} onClick={handleClose}>
                アカウント設定
              </MenuItem>
              <MenuItem 
                onClick={() => {
                  handleClose();
                  logout();
                }}
              >
                ログアウト
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </Box>
  );
};

export default Header;