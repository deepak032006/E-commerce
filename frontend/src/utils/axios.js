import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:5000',
  withCredentials:true
});

export default axiosInstance;
