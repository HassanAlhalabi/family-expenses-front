import axios from 'axios';
import { API_URL } from '../constants';
import Cookies from 'js-cookie';

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const initHTTPToken = () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('FEUToken')}`;
}

const http = axios;

export default http;
