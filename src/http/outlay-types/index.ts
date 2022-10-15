import { AxiosError } from 'axios';
import http from '..';
import { INewOutlayType } from '../../models/outlay-types';

export const getOutlayTypes = async () => {
    try {
        const res = await http.get(`/outlay-types`);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}

export const addOutlayType = async (OutlayType: INewOutlayType) => {
    try {
        const res = await http.post(`/outlay-types`,OutlayType);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}

export const updateOutlayType = async (id: number,OutlayType: INewOutlayType) => {
    try {
        const res = await http.put(`/outlay-types/${id}`,OutlayType);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}

export const deleteOutlayType = async (id: number) => {
    try {
        const res = await http.delete(`/outlay-types/${id}`);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}