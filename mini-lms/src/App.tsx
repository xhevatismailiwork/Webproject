import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./features/auth/PrivateRoute"; 
import AppLayout from "./components/AppLayout";

import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import StudentsPage from "./features/students/StudentsPage";
import CoursesPage from "./features/courses/CoursesPage";
import EnrollmentsPage from "./features/enrollments/EnrollmentsPage";
import ProfilePage from "./features/profile/ProfilePage";

function App() {
  return (
    <Routes>
      {/* Publike */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Private Layout */}
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/students" />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="enrollments" element={<EnrollmentsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
