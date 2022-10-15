import { AxiosError } from 'axios';
import http from '..';
import { INewOutlay } from '../../models/outlays';
import { getUserId, isAdmin } from '../../heplers';

export const getOutlays = async () => {
    try {
        if(isAdmin()) {
            const res = await http.get(`/outlays`);
            return res.data;
        }
        const res = await http.get(`/outlays/user-outlays`);
        return res.data;  
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}

export const addOutlay = async (outlay: INewOutlay) => {
    try {
        const res = await http.post(`/outlays/user-outlays`,outlay);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}

export const updateOutlay = async (id: number,outlay: INewOutlay) => {
    try {
        const res = await http.put(`/outlays/user-outlays/${id}`,{
            ...outlay,
            userId: getUserId()
        });
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}

export const deleteOutlay = async (id: number) => {
    try {
        const res = await http.delete(`/outlays/user-outlays/${id}`);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}