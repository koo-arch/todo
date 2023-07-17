import React, { useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import Logout from '../auth/logout';
import { requestAPI } from '../api/requests';
import urls from '../api/urls';
import {
  AppBar,
  Button,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Link,
  Menu,
  MenuItem
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Header = () => {
  const initialState = {
    id: '',
    email: '',
  }

  const [userInfo, setUserInfo] = useState(initialState);
  const [cookies, setCookie, removeCookie] = useCookies(['accesstoken', 'refreshtoken']);

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
        console.log(err.response.data)
      })
    },[]);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userInfo.email} 
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
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <Logout onClick={handleClose}/>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;