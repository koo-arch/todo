import Cookies from 'universal-cookie';
import axios from './axios.js';
import urls from './urls.js';

const cookies = new Cookies();

export const config = (cookie) => {
    const headers = {
        'Content-Type': 'Application/json',
        'Authorization': `JWT ${cookie}`
    }
    return headers;
}

export const postLogin = async(data) =>  {
    const res = await axios.post(urls.Login, 
        {
            email: data.email,
            password: data.password,
        },
    )
    return res;
}

export const getUserInfo = async(accsess) => {
    console.log(config(accsess))
    const res = await axios.get(urls.UserInfo, { headers: config(accsess) })
    return res;
}

export const getTaskList = async(access) => {
    const res = await axios.get(urls.TaskList, { headers: config(access) })
    return res;
}