import axios_ from "axios";

const axios = axios_.create({
    baseURL: '/api',
    withCredentials: true
})

export default axios