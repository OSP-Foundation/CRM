import axios from "axios";

const user = axios.create({
    baseURL: process?.env?.USER_SERVER,
    withCredentials: true
})

export default user