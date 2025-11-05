import React from "react";
import { Button, Card } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import  {logout}  from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card title="Profile" style={{ width: 400 }}>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <Button type="primary" danger onClick={handleLogout} block>
          Logout
        </Button>
      </Card>
    </div>
  );
};

export default ProfilePage;
