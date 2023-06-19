import axios from './axios.js';
import urls from './urls.js';


const config = (cookie) => {
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

export const postRegister = async(data) => {
    const res = await axios.post(urls.Register,
        {
            email: data.email,
            password: data.password,
        },
    )
    return res;
}

export const getUserInfo = async(access) => {
    console.log(config(access))
    const res = await axios.get(urls.UserInfo, { headers: config(access) })
    return res;
}

export const getTaskList = async(access) => {
    const res = await axios.get(urls.TaskList, { headers: config(access) })
    return res;
}