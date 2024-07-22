import { Routes, Navigate, useLocation, Route } from 'react-router-dom';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import UserDashboard from '@/components/dashboard/UserDashboard';
import CounselorDashboard from '@/components/dashboard/CounselorDashboard';
import { authService } from '@/services/authService';
import DashboardNavBar from '../layouts/DashboardNavBar';
import DashboardSideNav from '../layouts/DashboardSideNav';
import Profile from './Profile';
import AddSlot from './AddSlot';
import ViewSlot from './ViewSlot';
import { useEffect, useState } from 'react';
import NotFound from '../utils/NotFound';

const Dashboard = () => {
  const user = authService.getCurrentUser();
  const location = useLocation();
  const [isMobileSideNavBehaviourEnable, setIsMobileSideNavBehaviourEnable] =
    useState(false);
  const [showMobileSideNav, setShowMobileSideNav] = useState(false);

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobileSideNavBehaviourEnable(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="dashboard-wrapper h-screen bg-gray-200">
      <DashboardSideNav
        isMobileSideNavBehaviourEnable={isMobileSideNavBehaviourEnable}
        showMobileSideNav={showMobileSideNav}
        setShowMobileSideNav={setShowMobileSideNav}
      />
      <div className="dashboard-body px-2">
        <DashboardNavBar
          isMobileSideNavBehaviourEnable={isMobileSideNavBehaviourEnable}
          // showMobileSideNav={showMobileSideNav}
          setShowMobileSideNav={setShowMobileSideNav}
        />
        <Routes>
          <Route
            path=""
            element={
              user.role === 'admin' ? (
                <AdminDashboard />
              ) : user.role === 'user' ? (
                <UserDashboard />
              ) : user.role === 'counselor' ? (
                <CounselorDashboard />
              ) : (
                <NotFound />
              )
            }
          />
          <Route
            path="/add-slot"
            element={user.role === 'counselor' ? <AddSlot /> : <NotFound />}
          />
          <Route
            path="/view-slot/:id"
            element={user.role === 'counselor' ? <ViewSlot /> : <NotFound />}
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
