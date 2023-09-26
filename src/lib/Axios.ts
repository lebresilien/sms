import axios from 'axios';

const Axios = () => {

  let instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
  });

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default Axios();