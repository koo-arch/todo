import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { requestAPI, requestData } from '../api/requests';
import urls from '../api/urls';

const Login = (props) => {
    const navigation = useNavigate();

    const [movie, setMoive] = useState([]);
    const [cookies, setCookie] = useCookies(['accesstoken', 'refreshtoken']);
    const { register, handleSubmit, watch, errors } = useForm();

    const postLogin = (data) => {
        const requestJson = new requestData(data);
    
        const param = {
            data: data,
            request: requestJson.auth(),
            url: urls.Login
        }
    
        const request = new requestAPI(param);
        return request.post();
    }

    const getJwt = (data) => {
        postLogin(data)
            .then(res => {
                setCookie('accesstoken', res.data.access, { path: '/' }, { httpOnly: true })
                setCookie('refreshtoken', res.data.refresh, { path: '/' }, { httpOnly: true })
                navigation('/todo');
            })
            .catch(err => {
                console.log(err.response.data)
                setMoive(err.response.data)
            });
    };
    return (
        <div>
            <div>
                <h3>Login</h3>
            </div>
            <div>
                <form onSubmit={handleSubmit(getJwt)}>
                    <label>Email：</label>
                    <input className='form-control' {...register('email')} />
                    <label>PassWord：</label>
                    <input type="password" {...register('password', { required: true })} />
                    <input type="submit" value="ログイン"/>
                    {movie.detail}
                </form>
            </div>
        </div>
    );
};

export default Login;