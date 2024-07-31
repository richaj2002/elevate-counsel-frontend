import { Button } from '@material-tailwind/react';
import UserLocalTime from '../utils/UserLocalTime';
import calculateDuration from '@/utils/calculateDuration';

const AppointmentCard = ({ appointment, cancelAppointment = null }) => {
  const duration = calculateDuration(
    appointment.slot.startTime,
    appointment.slot.endTime
  );
  return (
    <div className="slot bg-white rounded-lg p-4 min-w-full sm:min-w-[50%] md:min-w-[33.33%] lg:min-w-[25%] flex flex-col">
      <h6 className="text-lg font-semibold">
        {appointment.slot.specialization.name}
      </h6>
      <h6 className="text-sm text-gray-600">
        Session type:{' '}
        {appointment.slot.isOneOnOneSession ? 'Individual' : 'Grouped'}
      </h6>
      <h6 className="text-sm text-gray-600">
        Start time: <UserLocalTime utcTime={appointment.slot.startTime} />
      </h6>
      <h6 className="text-sm text-gray-600">
        End time: <UserLocalTime utcTime={appointment.slot.endTime} />
      </h6>
      <h6 className="text-sm text-gray-600">Duration: {duration}</h6>
      <h6 className="text-sm text-gray-600">
        Counselor: {appointment.counselor.name}
      </h6>
      {cancelAppointment && appointment.status === 'booked' && (
        <Button
          className="bg-purple-200 mt-3 self-start"
          size="sm"
          onClick={() => cancelAppointment(appointment.id)}
        >
          Cancel
        </Button>
      )}
    </div>
  );
};

export default AppointmentCard;
