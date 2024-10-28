import axios from "axios";

const axiosInstance = axios.create({
    baseURL : 'https://tba-server.onrender.com'
});

export default axiosInstance;