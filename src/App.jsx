import { Route, Routes } from 'react-router-dom';
import './App.css';
import { setupAxiosInterceptors } from '@/services/axiosInterceptors';
import Landing from '@/components/landing/Landing';
import Dashboard from '@/components/dashboard/Dashboard';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import './assets/css/dashboard.css';
import './assets/css/landing.css';
import './assets/css/styles.css';

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
