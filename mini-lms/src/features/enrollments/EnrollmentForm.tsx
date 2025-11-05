import { useEffect } from "react";
import { Modal, Form, InputNumber, Select, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { addEnrollment, updateEnrollment } from "./enrollmentsSlice";
import type { Enrollment } from "./enrollmentsSlice";
import dayjs from "dayjs";

interface Props {
  open: boolean;
  onClose: () => void;
  editingEnrollment: Enrollment | null;
}

const EnrollmentForm: React.FC<Props> = ({ open, onClose, editingEnrollment }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const students = useSelector((state: RootState) => state.students.items);
  const courses = useSelector((state: RootState) => state.courses.items);

  useEffect(() => {
    if (!open) return;
    if (editingEnrollment) {
      form.setFieldsValue({
        ...editingEnrollment,
        enrolledAt: dayjs(editingEnrollment.enrolledAt),
      });
    } else {
      form.resetFields();
    }
  }, [editingEnrollment, form, open]);

  const handleOk = async () => {
    const values = await form.validateFields();
    const payload = {
      ...values,
      enrolledAt: values.enrolledAt.format("YYYY-MM-DD"),
      id: editingEnrollment?.id,
    };

    if (editingEnrollment) {
      await dispatch(updateEnrollment(payload as Enrollment));
    } else {
      await dispatch(addEnrollment(payload));
    }

    onClose();
    form.resetFields();
  };

  return (
    <Modal
      title={editingEnrollment ? "Edit Enrollment" : "Add Enrollment"}
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      centered
      okText={editingEnrollment ? "Update" : "Create"}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="studentId"
          label="Student"
          rules={[{ required: true, message: "Please select a student" }]}
        >
          <Select placeholder="Select student">
            {students.map((s) => (
              <Select.Option key={s.id} value={s.id}>
                {s.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="courseId"
          label="Course"
          rules={[{ required: true, message: "Please select a course" }]}
        >
          <Select placeholder="Select course">
            {courses.map((c) => (
              <Select.Option key={c.id} value={c.id}>
                {c.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="enrolledAt"
          label="Enrolled At"
          rules={[{ required: true, message: "Please pick a date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="progress"
          label="Progress (%)"
          rules={[{ required: true, message: "Please enter progress" }]}
        >
          <InputNumber min={0} max={100} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select>
            <Select.Option value="Enrolled">Enrolled</Select.Option>
            <Select.Option value="Completed">Completed</Select.Option>
            <Select.Option value="Dropped">Dropped</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EnrollmentForm;
