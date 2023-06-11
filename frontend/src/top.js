import React from "react";
import { Link } from "react-router-dom";
import Login from './login.js';
import Redirect from "./redirectToTodo.js";
import Cookies from "universal-cookie";
import { config } from "./api/requests.js";

const top = () => {
    const cookie = new Cookies();
    const token = cookie.get('accesstoken')

    if (token != null) {
        Redirect(token);
    }
    return (
        <>
            <Login/>
        </>
    );
};

export default top;