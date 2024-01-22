import axios_ from "axios";

export const axios = axios_.create({
    baseURL: '/api',
    withCredentials: true
})