import { Button } from '@material-tailwind/react';
import UserLocalTime from '../utils/UserLocalTime';
import calculateDuration from '@/utils/calculateDuration';

const SlotCard = ({ slot, index, viewSlot }) => {
  const duration = calculateDuration(slot.startTime, slot.endTime);
  return (
    <div
      className="slot bg-white rounded-lg p-4 min-w-full sm:min-w-[50%] md:min-w-[33.33%] lg:min-w-[25%] flex flex-col"
      key={index}
    >
      <h6 className="text-lg font-semibold">{slot.specializationName}</h6>
      <h6 className="text-sm text-gray-600">
        Slot type: {slot.isOneOnOneSession ? 'Individual' : 'Grouped'}
      </h6>
      <h6 className="text-sm text-gray-600">
        Start time: <UserLocalTime utcTime={slot.startTime} />
      </h6>
      <h6 className="text-sm text-gray-600">
        End time: <UserLocalTime utcTime={slot.endTime} />
      </h6>
      <h6 className="text-sm text-gray-600">Duration: {duration}</h6>
      <h6 className="text-sm text-gray-600">
        Appointment Booked: {slot.appointmentsBooked} / {slot.maxSlotSize} (
        {slot.bookingPercentage}%)
      </h6>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div
          className="bg-green-500 h-2.5 rounded-full"
          style={{
            width: `${slot.bookingPercentage}%`,
            transition: 'width 2s ease-in-out',
          }}
        ></div>
      </div>
      <Button
        className="bg-purple-200 mt-3 self-start"
        size="sm"
        onClick={() => viewSlot(slot.id)}
      >
        More Info
      </Button>
    </div>
  );
};

export default SlotCard;
