import { AxiosError } from 'axios';
import http from '..';
import { INewMaterial } from '../../models/materials';

export const getMaterials = async () => {
    try {
        const res = await http.get(`/materials`);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}

export const getServices = async () => {
    try {
        const res = await http.get(`/materials/services`);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}

export const addMaterial = async (Material: INewMaterial) => {
    try {
        const res = await http.post(`/materials`,Material);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}

export const updateMaterial = async (id: number,Material: INewMaterial) => {
    try {
        const res = await http.put(`/materials/${id}`,Material);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}

export const deleteMaterial = async (id: number) => {
    try {
        const res = await http.delete(`/materials/${id}`);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}