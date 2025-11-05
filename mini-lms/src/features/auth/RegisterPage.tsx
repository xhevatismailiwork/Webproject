import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerUser } from "./authSlice";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector(state => state.auth);

  const onFinish = async (values: any) => {
    const result = await dispatch(registerUser(values));
    if (registerUser.fulfilled.match(result)) {
      message.success("Registration successful!");
      navigate("/profile");
    } else {
      message.error(result.payload || "Error registering");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card title="Register" style={{ width: 400 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Your name" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Register
          </Button>
        </Form>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <span>Already have an account? </span>
          <Button type="link" onClick={() => navigate("/login")} style={{ padding: 0 }}>
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
