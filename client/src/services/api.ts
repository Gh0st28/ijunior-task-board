import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://trainee.fidelis.workers.dev/api',
    withCredentials: false,
    headers: {
        'Authorization': 'Bearer f70731d2-452f-4681-bb17-d06f9cc9c45f',
        'Content-Type': 'application/json',
    },
});