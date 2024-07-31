import { API_URL, authService } from '@/services/authService';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentCard from '../layouts/AppointmentCard';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

const UserDashboard = () => {
  const [appointment, setAppointment] = useState({});

  const fetchUserDashboardAppointments = async () => {
    try {
      const appointment = await axios.get(
        `${API_URL}/appointment/user/dashboard`
      );
      setAppointment(appointment.data.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  useEffect(() => {
    fetchUserDashboardAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/appointment/cancel/${id}`);
      toast.success(response.data.message);
      fetchUserDashboardAppointments();
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : 'Something went wrong.'
      );
      console.error('Error uploading file:', error);
    }
  };

  const submitCancelAppointment = (id) => {
    confirmAlert({
      title: 'Confirm to cancel',
      message: 'Are you sure you want to cancel this appointment?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => cancelAppointment(id),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <div>
      {appointment.booked && appointment.booked.length > 0 && (
        <div className="upcoming-slots-wrapper">
          <h5 className="text-xl font-bold mb-4 flex gap-2 align-middle">
            Booked Appointments
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </h5>
          <div className="upcoming-slots flex flex-nowrap overflow-x-auto gap-2 scrollbar-hide">
            {appointment.booked.map((appointment, index) => (
              <AppointmentCard
                key={index}
                appointment={appointment}
                cancelAppointment={submitCancelAppointment}
              />
            ))}
          </div>
        </div>
      )}
      {appointment.completed && appointment.completed.length > 0 && (
        <div className="upcoming-slots-wrapper">
          <h5 className="text-xl font-bold mb-4 flex gap-2 align-middle">
            Completed Appointments
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </h5>
          <div className="upcoming-slots flex flex-nowrap overflow-x-auto gap-2 scrollbar-hide">
            {appointment.completed.map((appointment, index) => (
              <AppointmentCard key={index} appointment={appointment} />
            ))}
          </div>
        </div>
      )}
      {appointment.cancelled && appointment.cancelled.length > 0 && (
        <div className="upcoming-slots-wrapper">
          <h5 className="text-xl font-bold mb-4 flex gap-2 align-middle">
            Cancelled Appointments
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </h5>
          <div className="upcoming-slots flex flex-nowrap overflow-x-auto gap-2 scrollbar-hide">
            {appointment.cancelled.map((appointment, index) => (
              <AppointmentCard key={index} appointment={appointment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
