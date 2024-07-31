import {
  Routes,
  Navigate,
  useLocation,
  Route,
  useNavigate,
} from 'react-router-dom';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import UserDashboard from '@/components/dashboard/UserDashboard';
import CounselorDashboard from '@/components/dashboard/CounselorDashboard';
import { API_URL, authService } from '@/services/authService';
import DashboardNavBar from '../layouts/DashboardNavBar';
import DashboardSideNav from '../layouts/DashboardSideNav';
import Profile from './Profile';
import AddSlot from './AddSlot';
import ViewSlot from './ViewSlot';
import { useEffect, useState } from 'react';
import NotFound from '../utils/NotFound';
import { toast } from 'react-toastify';
import axios from 'axios';

const Dashboard = () => {
  const user = authService.getCurrentUser();
  const location = useLocation();
  const navigate = useNavigate();
  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  useEffect(() => {
    if (!user) {
      navigate('/sign-in', { state: { from: location } });
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    const bookSlot = queryParams.get('bookSlot');

    const bookAppointment = async (slotId) => {
      try {
        const response = await axios.post(`${API_URL}/appointment/book/`, {
          slotId,
        });
        toast.success(response.data.message);
      } catch (error) {
        toast.error(
          error.response ? error.response.data.message : 'Something went wrong.'
        );
        console.error('Error booking appointment:', error);
      }
    };

    if (bookSlot) {
      if (user.role !== 'user') {
        toast.error('Please login as a user to book an appointment.');
      } else {
        bookAppointment(bookSlot);
      }
    }
  }, [location, navigate, user]);

  const [isMobileSideNavBehaviourEnable, setIsMobileSideNavBehaviourEnable] =
    useState(false);
  const [showMobileSideNav, setShowMobileSideNav] = useState(false);

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
