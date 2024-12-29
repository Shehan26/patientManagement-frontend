"use client";

import { useState } from "react";
import { Button, Table, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getPatientRecords, deleteRecord } from "./services/patientRecods";
import { useQuery, useMutation } from "@tanstack/react-query";

export default function Home() {
  const { data, isloading, refetch } = useQuery ({
    queryKey: ['patientRecods'],
    queryFn: getPatientRecords
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
  })

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
        <Button icon={<EditOutlined/>}className="mr-2"/>
        <Button icon={<DeleteOutlined/>} danger onClick={()=> deletePatientRecord(record?.id)}/>
      </div>
    }

  ]

    return (
    <div>
      <div className="flex justify-end mb-4">
      <Button type="primary">Add New Record</Button>
    </div>
    <Table columns={columns} dataSource={data} isloading={isloading}/> 
   </div> 
  );
}
