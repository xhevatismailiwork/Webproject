import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addStudent, updateStudent, type Student } from "./studentsSlice";

const { Option } = Select;

interface StudentFormProps {
  open: boolean;
  onClose: () => void;
  editingStudent: Student | null;
}

const StudentForm: React.FC<StudentFormProps> = ({
  open,
  onClose,
  editingStudent,
}) => {
  const [form] = Form.useForm<Student>();
  const dispatch = useDispatch<AppDispatch>();

  // Vetëm kur modal hapet, ngarko form-in
  useEffect(() => {
    if (!open) return;

    if (editingStudent) {
      form.setFieldsValue(editingStudent);
    } else {
      form.resetFields();
    }
  }, [editingStudent, form, open]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingStudent) {
        await dispatch(updateStudent({ ...editingStudent, ...values }));
      } else {
        await dispatch(addStudent(values));
      }
      onClose();
      form.resetFields();
    } catch (err) {
      console.error("Validation Failed:", err);
    }
  };

  return (
    <Modal
      title={editingStudent ? "Edit Student" : "Add Student"}
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      okText="Save"
      destroyOnHidden 
      forceRender // 🔑 kjo është kyçi për të shmangur warning
    >
      <Form form={form} layout="vertical" name="studentForm">
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: "Please enter student name" }]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter student email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          name="program"
          label="Program"
          rules={[{ required: true, message: "Please enter program" }]}
        >
          <Input placeholder="Enter program" />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select placeholder="Select status">
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudentForm;
