import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://e-commerce-8-h5f5.onrender.com',
  withCredentials:true
});

export default axiosInstance;
