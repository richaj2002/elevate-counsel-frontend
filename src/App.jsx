import { Route, Routes } from 'react-router-dom';
import './App.css';
import { setupAxiosInterceptors } from '@/services/axiosInterceptors';
import Landing from '@/components/landing/Landing';
import Dashboard from '@/components/dashboard/Dashboard';

setupAxiosInterceptors();

export const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Landing />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
