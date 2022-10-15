import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { IDecodedToken } from '../models';

export const isAdmin = () => {
    const token = Cookies.get('FEUToken');
    const decodedToken =  jwt_decode(token as string);
    return (decodedToken as IDecodedToken).isAdmin === 0 ? false : true; 
}

export const getUserId = () => {
    const token = Cookies.get('FEUToken');
    const decodedToken =  jwt_decode(token as string);
    return (decodedToken as IDecodedToken).userId; 
}