import React from "react";
import { Link } from "react-router-dom";
import Login from './login.js';
import Cookies from "universal-cookie";

const top = () => {
    const cookies = new Cookies();
    console.log(cookies.get('accesstoken'))
    console.log(cookies.get('refreshtoken'))
    return (
        <>
            <Login/>
        </>
    );
};

export default top;