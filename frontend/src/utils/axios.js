import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://e-commerce-2-5h9u.onrender.com',
  withCredentials:true
});

export default axiosInstance;
