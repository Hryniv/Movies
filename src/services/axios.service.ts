import axios from 'axios';
import {baseURL} from '../constans';

const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use(config => {
    const access = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmFjMjVmYjJjOWM3MmEyNzZmMzcyZmQxZmViNGMxZSIsInN1YiI6IjY0NTY1YWExZGFmNTdjMDEzNjkxMjM5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._ry-BALoIHmRBvw7ZiPHQOeqCjtVh72uobqmKHyyzcg";

    if (access) {
        config.headers.Authorization = `Bearer ${access}`
    }

    return config
})


export {
    axiosService
}