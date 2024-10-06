import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://myfrota.pt/api'
});

export const album_api = axios.create({
    baseURL: 'https://myfrota.pt/api/albums'
});

export function getHeaders() {
    return { headers: { "Content-Type": "application/json" } }
}
