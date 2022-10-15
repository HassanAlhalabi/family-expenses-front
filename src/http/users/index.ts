import { AxiosError } from 'axios';
import http from '..';
import { INewUser } from '../../models/users';

export const getUsers = async () => {
    try {
        const res = await http.get(`/users`);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}

export const addUser = async (user: INewUser) => {
    try {
        const res = await http.post(`/users`,user);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}

export const updateUser = async (id: number,user: INewUser) => {
    try {
        const res = await http.put(`/users/${id}`,user);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}

export const deleteUser = async (id: number) => {
    try {
        const res = await http.delete(`/users/${id}`);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}