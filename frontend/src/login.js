import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from './api/axios.js';
import urls from './api/urls.js';

const Login = (props) => {
    const navigation = useNavigate();

    const [cookies, setCookie] = useCookies();
    const { register, handleSubmit, watch, errors } = useForm();

    const getJwt = async(data) => {
        console.log(data)
        await axios.post(urls.Login,
            {
                email: data.email,
                password: data.password,
            },
        )
        .then(function (response) {
            console.log(response.data.access)
            setCookie('accesstoken', response.data.access, { path: '/todo' }, { httpOnly: true })
            setCookie('refreshtoken', response.data.refresh, { path: '/todo' }, { httpOnly: true })
            navigation('/todo');
        })
        .catch(err => {
            console.log("miss")
            alert("Emailかパスワードが違います");
        });
    };
    return (
        <div className="top-wrapper">
            <div class="login">
                <h3>Login</h3>
            </div>
            <div class="login-block">
                <form onSubmit={handleSubmit(getJwt)}>
                    <label for="email">Email：</label>
                    <input className='form-control' {...register('email')} />
                    <label for="password">PassWord：</label>
                    <input className='form-control' type="password" {...register('password', { required: true })} />
                    <input className='btn btn-secondary' type="submit" value="ログイン" />
                </form>
            </div>
        </div>
    );
};

export default Login;