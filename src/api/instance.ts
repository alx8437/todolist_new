import axios from "axios";

const TOKEN = '1d420fcc-a139-409e-9feb-dfa7a2bcc2f6'
const API_KEY ='6b9c4cb8-f5dd-4538-b450-c4a8c6342a0a'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        'API-KEY': API_KEY,
    }
})