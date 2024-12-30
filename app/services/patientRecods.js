import { instance } from "./api";

export const getPatientRecords = async() =>{
    const response = await instance.get("/patient-visit");
    return response.data;
}

export const deleteRecord = async(id) => {
    return await instance.delete(`/patient-visit/${id}`);
}

export const addPatientRecord = async(payload) => {
    return await instance.post('/patient-visit', payload);
}

export const updatePatientRecord = async(id, payload) => {
    return await instance.put(`/patient-visit/${id}`, payload);
}