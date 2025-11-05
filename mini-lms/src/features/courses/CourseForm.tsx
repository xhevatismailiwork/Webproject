import { useEffect } from "react";
import { Modal, Form, Input, InputNumber } from "antd";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addCourse, updateCourse } from "./coursesSlice";
import type { Course } from "./coursesSlice";

interface CourseFormProps {
  open: boolean;
  onClose: () => void;
  editingCourse: Course | null;
}

export default function CourseForm({ open, onClose, editingCourse }: CourseFormProps) {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!open) return;
    if (editingCourse) form.setFieldsValue(editingCourse);
    else form.resetFields();
  }, [editingCourse, form, open]);

  const handleFinish = (values: Omit<Course, "id">) => {
    if (editingCourse) {
      dispatch(updateCourse({ ...editingCourse, ...values }));
    } else {
      dispatch(addCourse(values));
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      title={editingCourse ? "Edit Course" : "Add New Course"}
      okText={editingCourse ? "Update" : "Create"}
      onCancel={onClose}
      onOk={() => form.submit()}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ marginTop: 8 }}
      >
        <Form.Item
          name="title"
          label="Course Title"
          rules={[{ required: true, message: "Please enter course title" }]}
        >
          <Input placeholder="e.g. Introduction to AI" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please enter course category" }]}
        >
          <Input placeholder="e.g. Computer Science" />
        </Form.Item>

        <Form.Item
          name="instructor"
          label="Instructor Name"
          rules={[{ required: true, message: "Please enter instructor name" }]}
        >
          <Input placeholder="e.g. John Doe" />
        </Form.Item>

        <Form.Item
          name="credits"
          label="Credits"
          rules={[{ required: true, message: "Please enter course credits" }]}
        >
          <InputNumber min={1} max={30} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
