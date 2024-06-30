import { Routes, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from '@/routes/ProtectedRoute';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import UserDashboard from '@/components/dashboard/UserDashboard';
import CounselorDashboard from '@/components/dashboard/CounselorDashboard';
import { authService } from '@/services/authService';

const Dashboard = () => {
  const user = authService.getCurrentUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return (
    <Routes>
      <ProtectedRoute
        path=""
        roles={['admin', 'user', 'counselor']}
        element={
          user.role === 'admin' ? (
            <AdminDashboard />
          ) : user.role === 'user' ? (
            <UserDashboard />
          ) : user.role === 'counselor' ? (
            <CounselorDashboard />
          ) : null // Handle any other roles or scenarios
        }
      />
    </Routes>
  );
};

export default Dashboard;
