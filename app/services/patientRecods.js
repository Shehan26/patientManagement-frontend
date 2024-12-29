import { instance } from "./api";

export const getPatientRecords = async() =>{
    const response = await instance.get("/patient-visit");
    return response.data;
}

export const deleteRecord = async(id) => {
    return await instance.delete(`/patient-visit/${id}`);
}