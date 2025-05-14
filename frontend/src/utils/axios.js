import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://e-commerce-5-48ed.onrender.com',
  withCredentials:true
});

export default axiosInstance;
