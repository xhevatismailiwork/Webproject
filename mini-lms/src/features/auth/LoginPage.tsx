import React, { useEffect } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login } from "./authSlice";

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (user) navigate("/students");
  }, [user, navigate]);

  useEffect(() => {
    if (error) message.error(error);
  }, [error]);

  const handleLogin = (values: any) => {
    dispatch(login(values));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card title="Login" style={{ width: 400 }}>
        <Form form={form} layout="vertical" onFinish={handleLogin}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        </Form>

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <span>Don't have an account? </span>
          <Button type="link" onClick={() => navigate("/register")} style={{ padding: 0 }}>
            Register
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
