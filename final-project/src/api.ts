import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3000'
}) 

export async function getGenreImages() {
    const response = await api.get('images/genreImages')
    return response.data
}