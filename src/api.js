const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const getHeaders = () => ({
    'Content-Type': 'application/json',
});

export const getData = async (endpoint, params = {}) => {
    const url = new URL(API_BASE_URL + endpoint);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
    });
    return response.json();
};

export const postData = async (endpoint, data) => {
    const response = await fetch(API_BASE_URL + endpoint, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return response.json();
};

export const updateData = async (endpoint, id, data) => {
    console.log("ID no api.js:", id);
    const response = await fetch(API_BASE_URL + endpoint + '/' + id, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return response.json();
};

export const deleteData = async (endpoint, id) => {
    const response = await fetch(API_BASE_URL + endpoint + '/' + id, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    return response.json();
};

export const getCidades = async () => {
    return await getData('cidades');
};


export default {
    getData,
    postData,
    updateData,
    deleteData,
    getCidades
};