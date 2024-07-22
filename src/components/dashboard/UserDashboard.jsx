import { authService } from '@/services/authService';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();
  if (user.role !== 'user') {
    navigate(-1);
  }
  return <div>UserDashboard</div>;
};

export default UserDashboard;
