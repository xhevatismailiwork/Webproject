import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Tag,
  Progress,
  Button,
  Popconfirm,
  message,
  Space,
  Card,
  Typography,
  Spin,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { RootState, AppDispatch } from "../../app/store";
import { fetchEnrollments, deleteEnrollment } from "./enrollmentsSlice";
import type { Enrollment } from "./enrollmentsSlice";
import EnrollmentForm from "./EnrollmentForm";

const { Title } = Typography;

const EnrollmentsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector(
    (state: RootState) => state.enrollments
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEnrollment, setEditingEnrollment] = useState<Enrollment | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchEnrollments());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteEnrollment(id));
    message.success("✅ Enrollment deleted successfully!");
  };

  const columns: ColumnsType<Enrollment> = [
    { title: "Student ID", dataIndex: "studentId", key: "studentId" },
    { title: "Course ID", dataIndex: "courseId", key: "courseId" },
    { title: "Enrolled At", dataIndex: "enrolledAt", key: "enrolledAt" },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (val: number) => <Progress percent={val} size="small" />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Enrollment["status"]) => (
        <Tag
          color={
            status === "Enrolled"
              ? "blue"
              : status === "Completed"
              ? "green"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingEnrollment(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this enrollment?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger type="link">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading)
    return (
      <div style={{ textAlign: "center", paddingTop: 100 }}>
        <Spin size="large" />
      </div>
    );

  return (
    
    <Card
      style={{ margin: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
      styles={{ body: { padding: 24 } }}    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          🎓 Enrollment Management
        </Title>
        <Button
          type="primary"
          onClick={() => {
            setEditingEnrollment(null);
            setIsModalOpen(true);
          }}
        >
          Add Enrollment
        </Button>
      </div>

      <Table
        rowKey="id"
        dataSource={items}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />

      <EnrollmentForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingEnrollment={editingEnrollment}
      />
    </Card>
  );
};

export default EnrollmentsPage;
