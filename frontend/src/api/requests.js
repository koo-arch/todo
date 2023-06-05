import Cookies from 'universal-cookie';
import axios from './axios.js';
import urls from './urls.js';

const cookies = new Cookies();

const headers = {
    'Content-Type': 'Application/json',
    'Authorization': `JWT ${cookies.get('accecctoken')}`
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