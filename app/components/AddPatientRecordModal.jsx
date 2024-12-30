import { useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select, Button } from "antd";
import dayjs from "dayjs";

const AddPatientRecordModal = ({ open, oncancel, onSubmit, patients, onUpdate, selectedRecord }) =>{
    const [form] = Form.useForm();

    const { TextArea } = Input;

    useEffect(() => {
        if(selectedRecord) {
            form.setFieldsValue({
                ...selectedRecord,
                visitDate: dayjs(selectedRecord.visitDate)
            })
        }
    },[selectedRecord]);


    const handleSubmit = (data) => {
        const payload = {
            ...data,
            visitDate: dayjs(data.visitDate).format("YYYY-MM-DD"),
        }

        if(selectedRecord) {
            onUpdate(payload);
        } else {
            onSubmit(payload);;
        }
    }

    return(
        <Modal title={selectedRecord ? "Update" : "Add New Record"} open={open} onCancel={oncancel} footer={false} destroyOnClose={true}>
            <Form
                name="add patient-form" 
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item label="Patient" name="patientId" required={true} rules={[{ required: true, message: "Please select patient "}]}>
                    <Select
                        showSearch
                        optionFilterProp="label"
                        options={patients?.map(patient => ({
                            value: patient.id,
                            label: `${patient.firstName} ${patient?.lastName}`
                        }))}
                    />
                </Form.Item>
                <Form.Item label="Date" name="visitDate" required={true} rules={[{ required: true, message: "Please select date"}]}>
                    <DatePicker/>
                </Form.Item>
                <Form.Item label="Reason" name="reason" required={true} rules={[{ required: true, message: "Please enter reason"}]}>
                    <TextArea/>
                </Form.Item>
                <Form.Item label="Diagnosis" name="diagnosis" required={true} rules={[{ required: true, message: "Please enter diagnosis"}]}>
                    <TextArea/>
                </Form.Item>
                <Form.Item label="Prescribed Medications" name="prescribedMedication" required={true} rules={[{ required: true, message: "Please enter prescribe medications"}]}>
                    <TextArea/>
                </Form.Item>
                <Form.Item label="Notes" name="note" required={true} rules={[{ required: true, message: "Please enter notes"}]}>
                    <TextArea/>
                </Form.Item>
                <div className="flex justify-end">
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}

export default AddPatientRecordModal;