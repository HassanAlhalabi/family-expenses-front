import { AxiosError } from 'axios';
import http from '..'; 

export const getYearReport = async (year: number) => {
    try {
        const res = await http.get(`/reports/year-total?year=${year}`);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}

export const getYearMonthReport = async (year: number, month: number) => {
    try {
        const res = await http.get(`/reports/month-total?year=${year}&month=${month}`);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}

export const getUserReport = async (userId: number) => {
    try {
        const res = await http.get(`/reports/user-total?userId=${userId}`);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}

export const getMaterialReport = async (materialId: number) => {
    try {
        const res = await http.get(`/reports/material-total?materialId=${materialId}`);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}

export const getServicesReport = async (materialId: number) => {
    try {
        const res = await http.get(`/reports/services-total?materialId=${materialId}`);
        return res.data;
    } catch (error) {
        return (error as AxiosError).response?.data;
    }
}