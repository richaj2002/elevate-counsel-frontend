import SlotCard from '@/components/layouts/SlorCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/services/authService';

const CounselorDashboard = () => {
  const [slots, setSlots] = useState({});

  useEffect(() => {
    const fetchCounselorDashboardSlots = async () => {
      try {
        const slots = await axios.get(`${API_URL}/slot/counselor/dashboard`);
        setSlots(slots.data.data);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };
    fetchCounselorDashboardSlots();
  }, []);

  return (
    <div>
      {slots.running && slots.running.length > 0 && (
        <div className="upcoming-slots-wrapper">
          <h5 className="text-xl font-bold mb-4 flex gap-2 align-middle">
            Running Slots
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
            {slots.running.map((slot, index) => (
              <SlotCard
                key={index}
                slot={slot}
                isFromCounselorDashboard={true}
              />
            ))}
          </div>
        </div>
      )}
      {slots.active && slots.active.length > 0 && (
        <div className="upcoming-slots-wrapper">
          <h5 className="text-xl font-bold mb-4 flex gap-2 align-middle">
            Upcoming Slots
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
            {slots.active.map((slot, index) => (
              <SlotCard
                key={index}
                slot={slot}
                isFromCounselorDashboard={true}
              />
            ))}
          </div>
        </div>
      )}
      {slots.completed && slots.completed.length > 0 && (
        <div className="completed-slots-wrapper pt-6">
          <h5 className="text-xl font-bold mb-4 flex gap-2 align-middle">
            Completed Slots
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
            {slots.completed.map((slot, index) => (
              <SlotCard
                key={index}
                slot={slot}
                isFromCounselorDashboard={true}
              />
            ))}
          </div>
        </div>
      )}
      {slots.cancelled && slots.cancelled.length > 0 && (
        <div className="completed-slots-wrapper pt-6">
          <h5 className="text-xl font-bold mb-4 flex gap-2 align-middle">
            Cancelled Slots
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
            {slots.cancelled.map((slot, index) => (
              <SlotCard
                key={index}
                slot={slot}
                isFromCounselorDashboard={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CounselorDashboard;
