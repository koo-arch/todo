import { useEffect } from 'react';
import axios from '../api/axios';
import useRefreshToken from './useRefreshToken';

const useCustomAxios = () => {
    const refresh = useRefreshToken();

    useEffect(() => {
        const responseIntercept = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    if (newAccessToken === undefined) {
                        return Promise.reject(error);
                    }
                    console.log(newAccessToken);
                    prevRequest.headers["Authorization"] = `JWT ${newAccessToken}`;
                    return axios(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(responseIntercept);
        };
    },[])

    return axios;
}

export default useCustomAxios;