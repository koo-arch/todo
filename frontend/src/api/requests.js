import Cookies from 'universal-cookie';

const cookies = new Cookies();

const headers = {
    'Content-Type': 'Application/json',
    'Authorization': `JWT ${cookies.get('accecctoken')}`
}

export const postLogin = () => {
    
}