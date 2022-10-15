import { AxiosError } from 'axios';
import http from '..';
import { ILogin } from '../../models';

export const login = async (credentials: ILogin) => {
    try {
        const res = await http.post(`/auth/login`,{
            userName: credentials.userName,
            password: credentials.password
        });
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}