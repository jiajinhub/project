// api.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/', // Base URL of your Java backend
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getSomeData = async () => {
    try {
        const response = await apiClient.get('user/test');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching data');
    }
};