import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL

const options = {
    baseURL ,
    withCredentials: true,
    timeout : 10000
}

const API = axios.create(options)

API.interceptors.response.use((response) => {
    return response
} , async (error) => {
    console.log(error)
    return Promise.reject(error)
})


export default API