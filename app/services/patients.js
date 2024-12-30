import { instance } from "./api";

export const getPatients = async() => {
    const response = await instance.get('/patient');
    return response.data;
}

export const addPatient = async(data) => {
    return await instance.post('/patient', data)
}