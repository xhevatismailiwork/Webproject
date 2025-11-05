import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { fetchCourses, deleteCourse } from "./coursesSlice";
import type { Course } from "./coursesSlice";
import { Button, Table, Space, Popconfirm, message, Card, Typography } from "antd";
import CourseForm from "./CourseForm";

const { Title } = Typography;

export default function CoursesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.courses);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteCourse(id));
    message.success("✅ Course deleted successfully!");
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Instructor", dataIndex: "instructor", key: "instructor" },
    { title: "Credits", dataIndex: "credits", key: "credits" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Course) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingCourse(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this course?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ margin: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Title level={3} style={{ margin: 0 }}>
          📘 Courses Management
        </Title>
        <Button
          type="primary"
          onClick={() => {
            setEditingCourse(null);
            setIsModalOpen(true);
          }}
        >
          Add New Course
        </Button>
      </div>

      <Table
        rowKey="id"
        dataSource={items}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <CourseForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingCourse={editingCourse}
      />
    </Card>
  );
}
