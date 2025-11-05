import React, { useEffect, useState } from "react";
import { Table, Button, Space, Tag, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import {
  fetchStudents,
  deleteStudent,
  type Student,
} from "./studentsSlice";
import StudentForm from "./StudentForm";

const { Search } = Input;
const { Option } = Select;

const StudentsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const students = useSelector((state: RootState) => state.students.items);
  const loading = useSelector((state: RootState) => state.students.loading);

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const handleDelete = (id: string) => {
    dispatch(deleteStudent(id));
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText);

    const matchesStatus = statusFilter ? student.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: Student, b: Student) => a.name.localeCompare(b.name),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Program", dataIndex: "program", key: "program" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Student) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingStudent(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button danger type="link" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Students</h2>

      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search by name or email"
          onSearch={handleSearch}
          allowClear
        />

        <Select
          placeholder="Filter by status"
          style={{ width: 200 }}
          allowClear
          onChange={(value: string | undefined) => setStatusFilter(value || null)}
        >
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>

        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Student
        </Button>
      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredStudents}
        loading={loading}
      />

      <StudentForm
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingStudent(null);
        }}
        editingStudent={editingStudent}
      />
    </div>
  );
};

export default StudentsPage;
