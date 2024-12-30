import { Modal, Form, Input, Button, DatePicker } from "antd"
import dayjs from "dayjs";

const AddPatientModal = ({ open, onSumbit, handleClose  }) => {
    const [form] = Form.useForm();

    const handleSubmit = (data) => {
        const payload = {
            ...data,
            dob: dayjs(data.dob).format("YYYY-MM-DD")
        }

        onSumbit(payload);
    }

    return(
        <Modal
            title="Add Patient"
            open={open}
            onCancel={handleClose}
            footer={false}
            destroyOnClose={true}
        >
            <Form
                name="add-patient"
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item label="First Name" name="firstName" required={true} rules={[{required: true, message: "Please enter first name"}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Last Name" name="lastName" required={true} rules={[{required: true, message: "Please enter last name"}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Date of Birth" name="dob" required={true} rules={[{required: true, message: "Please select date of birth"}]}>
                    <DatePicker/>
                </Form.Item>
                <Form.Item label="Contact No" name="contactNo" required={true} rules={[{required: true, message: "Please enter contact number"}]}>
                    <Input/>
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

export default AddPatientModal;