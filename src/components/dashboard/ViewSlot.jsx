import { API_URL } from '@/services/authService';
import { Card, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserLocalTime from '../utils/UserLocalTime';
import calculateDuration from '@/utils/calculateDuration';

function ViewSlot() {
  const { id } = useParams();
  const [slot, setSlot] = useState({});
  const [slotDuration, setSlotDuration] = useState(null);
  const slotAppointmentTableHead = ['#', 'Name', 'Email', 'Status'];

  const fetchSlot = async () => {
    try {
      const slot = await axios.get(`${API_URL}/slot/${id}`);
      setSlot(slot.data.data);
      setSlotDuration(
        calculateDuration(slot.data.data.startTime, slot.data.data.endTime)
      );
    } catch (error) {
      console.error('Error fetching slot:', error);
    }
  };

  useEffect(() => {
    fetchSlot();
  }, []);

  return (
    <div className="view-slot-wrapper">
      <div className="slot-details">
        {slot.specialization && (
          <Typography
            variant="large"
            color="blue-gray"
            className="font-normal leading-none"
          >
            Specialization: {slot.specialization.name}
          </Typography>
        )}
        <Typography
          variant="large"
          color="blue-gray"
          className="font-normal leading-none"
        >
          Session type: {slot.isOneOnOneSession ? 'Individual' : 'Grouped'}
        </Typography>
        <Typography
          variant="large"
          color="blue-gray"
          className="font-normal leading-none"
        >
          Start Time: <UserLocalTime utcTime={slot.startTime} />
        </Typography>
        <Typography
          variant="large"
          color="blue-gray"
          className="font-normal leading-none"
        >
          End time: <UserLocalTime utcTime={slot.endTime} />
        </Typography>
        <Typography
          variant="large"
          color="blue-gray"
          className="font-normal leading-none"
        >
          Duration: {slotDuration}
        </Typography>
      </div>
      <Card className="h-full w-full overflow-auto my-4">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {slotAppointmentTableHead.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-purple-200 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slot.appointments &&
              slot.appointments.map(({ status, user }, index) => (
                <tr key={index} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.email}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {status}
                    </Typography>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default ViewSlot;
