"use client";

import { useState } from "react";
import { Button, Table, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getPatientRecords, deleteRecord, addPatientRecord, updatePatientRecord } from "./services/patientRecods";
import { getPatients } from "./services/patients";
import { useQuery, useMutation } from "@tanstack/react-query";
import AddPatientRecordModal from "./components/AddPatientRecordModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const { data, isLoading, refetch } = useQuery ({
    queryKey: ['patientRecods'],
    queryFn: getPatientRecords
  });

  const { data: patients } = useQuery({
    queryKey: ['patients'],
    queryFn: getPatients
  });

  const { mutate: deletePatientRecord } = useMutation({
    mutationFn: deleteRecord,
    onSuccess: () => {
      message.success("Patient deleted successfully");
      refetch();
    },
    onError: (error) => {
      message.error("Unable to delete record");
    }
  });

  const { mutate: savePatientRecord} = useMutation({
    mutationFn: addPatientRecord,
    onSuccess: () => {
      message.success("Added new record successfully");
      setIsModalOpen(false);
      refetch();
    },
    onError: () => message.error("Something went wrong")
  });

  const { mutate: updateRecord } = useMutation({
    mutationFn: ({ id, payload }) => updatePatientRecord(id, payload),
    onSuccess: () => {
      message.success("Successfully updated");
      setIsModalOpen(false);
      setSelectedRecord(null);
      refetch();
    },
    onError: () => message.error("Something went wrong")
  });



  const columns = [
    {
      title: "Id",
      key: "id",
      dataIndex:"id"
    },
    {
      title: "Patient",
      key: "patient",
      render: (record) => `${record?.patient?.firstName} ${record?.patient?.lastName}`
    },
    {
      title: "Visit Date",
      key: "visitDate",
      dataIndex:"visitDate"
    },
    {
      title: "Reason",
      key: "reason",
      dataIndex:"reason"
    },
    {
      title: "Diagnosis",
      key: "diagnosis",
      dataIndex:"diagnosis"
    },
    {
      title: "Prescribe Medication",
      key: "prescribedMedication",
      dataIndex:"prescribedMedication"
    },
    {
      key: "actions",
      render: (record) => 
      <div className="flex">
        <Button icon={<EditOutlined/>}className="mr-2" onClick={() => {
          setSelectedRecord(record);
          setIsModalOpen(true);
        }}/>
        <Button icon={<DeleteOutlined/>} danger onClick={()=> deletePatientRecord(record?.id)}/>
      </div>
    }

  ];

  const handleModalCloase = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  }

  const handleAdd = (payload) => {
    savePatientRecord(payload);
  }

  const handleUpdate = (payload) => {
    updateRecord({ id: selectedRecord.id, payload });
  }

    return (
    <div>
      <div className="flex justify-end mb-4">
      <Button type="primary" onClick={() => setIsModalOpen(true)}>Add New Record</Button>
    </div>
    <Table columns={columns} dataSource={data} loading={isLoading}/>
    {
      isModalOpen && <AddPatientRecordModal open={isModalOpen} oncancel={handleModalCloase} patients={patients} onSubmit={handleAdd} onUpdate={handleUpdate} selectedRecord={selectedRecord}/> 
    }
   </div> 
  );
}
