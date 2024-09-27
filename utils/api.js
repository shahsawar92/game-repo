// src/utils/api.js
import axiosInstance from './axiosInstance';

// GET request
export const get = async (url, params = {}) => {
    try {
        const response = await axiosInstance.get(url, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// POST request
export const post = async (url, data, header) => {

        let headers = {};
        // Check if the data is FormData
        if (data instanceof FormData) {
            headers['Content-Type'] = 'multipart/form-data';
        }
        if (!(data instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }
        
        const response = await axiosInstance.post(url, data, { headers });
        console.log('api response is:',response);
        return response.data;
  
};

// PUT request
export const put = async (url, data) => {
    try {
        const response = await axiosInstance.put(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// DELETE request
export const del = async (url) => {
    try {
        const response = await axiosInstance.delete(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};
