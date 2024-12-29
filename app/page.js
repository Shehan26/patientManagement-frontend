"use client";

import { useState } from "react";
import { Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getPatientRecords } from "./services/patientRecods";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isloading } = useQuery ({
    queryKey: ['patientRecods'],
    queryFn: getPatientRecords
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
        <Button icon={<EditOutlined/>}className="mr-2"/>
        <Button icon={<DeleteOutlined/>} danger/>
      </div>
    }

  ]

    return (
    <div>
      <div className="flex justify-end">
      <Button type="primary">Add New Record</Button>
    </div>
    <Table columns={columns} dataSource={data} isloading={isloading}/> 
   </div> 
  );
}
