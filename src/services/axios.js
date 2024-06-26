import axios from "axios";


export function getApiClient(token) {
    const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL
    })
    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`
    }
    return api
}

