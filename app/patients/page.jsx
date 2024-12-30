"use client";

import { useState } from "react";
import { Button, Table, message } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPatients, addPatient } from "../services/patients";
import AddPatientModal from "../components/AddPatientModal";

const Patients = () => {
    const [showModal, setShowModal] = useState(false);

    const { data, isLoading, refetch} = useQuery({
        queryKey: ["patients"],
        queryFn: getPatients
    });

    const { mutate: savePatient } = useMutation({
        mutationFn: addPatient,
        onSuccess: () => {
            setShowModal(false);
            message.success("Successfully added");
            refetch();
        },
        onError: () => message.error("Something went wrong")
    })

    const columns = [
        {
            title: 'Id',
            key: 'id',
            dataIndex: 'id'
        },
        {
            title: 'First Name',
            key: 'firstName',
            dataIndex: 'firstName'
        },
        {
            title: 'Last Name',
            key: 'lastName',
            dataIndex: 'lastName'
        },
        {
            title: 'Date of Birth',
            key: 'dob',
            dataIndex: 'dob'
        },
        {
            title: 'Contact No',
            key: 'contactNo',
            dataIndex: 'contactNo'
        }
    ];

    const handleSubmit = (payload) => {
        savePatient(payload);
    }

    return(
        <div>
            <div className="flex justify-end mb-4">
                <Button type="primary" onClick={() => setShowModal(true)}>Add Patient</Button>
            </div>
            <Table columns={columns} dataSource={data} loading={isLoading}/>
            <AddPatientModal open={showModal} onSumbit={handleSubmit} handleClose={() => setShowModal(false)}  />
        </div>
    )
}

export default Patients;