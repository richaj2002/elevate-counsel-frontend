import { API_URL } from '@/services/authService';
import {
  Button,
  Input,
  Slider,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactSelect from 'react-select';
import DateTimePicker from 'react-datetime-picker';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const AddSlot = () => {
  const navigate = useNavigate();
  const [counselorSpecializations, setCounselorSpecializations] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const minStartDatetime = new Date();
  minStartDatetime.setSeconds(0);
  const minEndDateTime = new Date();
  minEndDateTime.setMinutes(minEndDateTime.getMinutes() + 40);
  minEndDateTime.setSeconds(0);

  const slotTypes = [
    {
      label: 'Individual',
      value: true,
    },
    {
      label: 'Group',
      value: false,
    },
  ];
  const handleMaxSlotSliderChange = (e) => {
    const value = Math.round(parseFloat(e.target.value));
    setFormData({ ...formData, maxSlotSize: value });
    setErrors({ ...errors, maxSlotSize: '' });
  };

  const validateTimes = (startTime, endTime) => {
    const newErrors = { ...errors };
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      if (start > end) {
        newErrors.startTime = 'Start time cannot be greater than end time.';
      } else {
        newErrors.startTime = '';
      }
      const diff = (end - start) / (1000 * 60);
      if (diff < 40 || diff > 120) {
        newErrors.endTime =
          'Difference between start and end time should be between 40 minutes to 2 hours';
      } else {
        newErrors.endTime = '';
      }
    }
    setErrors(newErrors);
  };

  const handleStartTimeChange = (startTime) => {
    const utcDate = new Date(startTime.toISOString());
    setFormData({ ...formData, startTime });
    validateTimes(utcDate, formData.endTime);
  };

  const handleEndimeChange = (endTime) => {
    const utcDate = new Date(endTime.toISOString());
    setFormData({ ...formData, endTime });
    validateTimes(formData.startTime, utcDate);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' });
  };
  const [formData, setFormData] = useState({
    specialization: '',
    isOneOnOneSession: true,
    maxSlotSize: 1,
    startTime: minStartDatetime,
    endTime: minEndDateTime,
    appointmentURL: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    specialization: '',
    isOneOnOneSession: '',
    maxSlotSize: '',
    startTime: '',
    endTime: '',
    appointmentURL: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...errors };
    if (!formData.specialization) {
      newErrors.specialization = 'Please select specialization.';
      valid = false;
    }
    if (formData.isOneOnOneSession) {
      formData.maxSlotSize = 1;
    }
    if (!formData.isOneOnOneSession) {
      if (formData.maxSlotSize < 10) {
        newErrors.maxSlotSize = 'For group sessions minimum 10 seats required.';
        valid = false;
      }
    }
    if (newErrors.startTime || newErrors.endTime) {
      valid = false;
    }
    if (!formData.appointmentURL) {
      newErrors.appointmentURL = 'Please enter appointment URL.';
      valid = false;
    }
    if (!formData.description) {
      newErrors.description = 'Please enter description.';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      console.log('Invalid', formData);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(`${API_URL}/slot`, {
        ...formData,
      });
      setIsSubmitting(false);
      toast.success(response.data.message);
      navigate('/dashboard');
    } catch (error) {
      // Handle network errors or other exceptions
      setIsSubmitting(false);
      toast.error(
        error.response ? error.response.data.message : 'Something went wrong.'
      );
      console.error('Error during adding slot:', error);
    }
  };
  useEffect(() => {
    const fetchCounselorSpecializations = async () => {
      try {
        const response = await axios.get(`${API_URL}/specialization/counselor`);
        const specializationResponse = response.data.data.map(
          (specialization) => ({
            value: specialization.id,
            label: specialization.name,
          })
        );
        setCounselorSpecializations(specializationResponse);
      } catch (error) {
        console.error('Error fetching counselor specializations:', error);
      }
    };
    fetchCounselorSpecializations();
  }, []);
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="">
        <Typography variant="small" color="blue-gray" className=" font-medium">
          Select Specialization
        </Typography>
        <ReactSelect
          isClearable={true}
          isSearchable={true}
          name="specialization"
          value={counselorSpecializations.filter(
            (option) => formData.specialization === option.value
          )}
          options={counselorSpecializations}
          onChange={(value) => {
            setFormData({ ...formData, specialization: value.value });
            setErrors({ ...errors, specialization: '' });
          }}
        />
        {errors.specialization && (
          <Typography variant="small" color="red" className="font-medium">
            {errors.specialization}
          </Typography>
        )}
      </div>
      <div className="flex gap-4">
        <div className="add-slot-field">
          <Typography
            variant="small"
            color="blue-gray"
            className=" font-medium"
          >
            Select Slot Type
          </Typography>
          <ReactSelect
            isClearable={true}
            isSearchable={true}
            name="isOneOnOneSession"
            value={slotTypes.filter(
              (option) => formData.isOneOnOneSession === option.value
            )}
            options={slotTypes}
            onChange={(value) => {
              setFormData({ ...formData, isOneOnOneSession: value.value });
              setErrors({ ...errors, isOneOnOneSession: '' });
            }}
          />
          {errors.isOneOnOneSession && (
            <Typography variant="small" color="red" className="font-medium">
              {errors.isOneOnOneSession}
            </Typography>
          )}
        </div>

        {formData.isOneOnOneSession === false && (
          <div className="add-slot-field">
            <Typography
              variant="small"
              color="blue-gray"
              className=" font-medium"
            >
              Max Seats Allowed
            </Typography>
            <Slider
              min={1}
              max={100}
              defaultValue={1}
              value={formData.maxSlotSize}
              onChange={handleMaxSlotSliderChange}
              className="my-2"
            />
            <Typography variant="small">
              {formData.maxSlotSize || 1} Seats
            </Typography>
            {errors.maxSlotSize && (
              <Typography variant="small" color="red" className="font-medium">
                {errors.maxSlotSize}
              </Typography>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <div className="add-slot-field">
          <Typography
            variant="small"
            color="blue-gray"
            className=" font-medium"
          >
            Select Start Time
          </Typography>
          <DateTimePicker
            id="startTime"
            value={formData.startTime}
            onChange={handleStartTimeChange}
            className="time-picker-field"
            minDate={minStartDatetime}
            format="yyyy-MM-dd HH:mm:ss"
          />
          {errors.startTime && (
            <Typography variant="small" color="red" className="font-medium">
              {errors.startTime}
            </Typography>
          )}
        </div>

        <div className="add-slot-field">
          <Typography
            variant="small"
            color="blue-gray"
            className=" font-medium"
          >
            Select End Time
          </Typography>
          <DateTimePicker
            id="endTime"
            value={formData.endTime}
            onChange={handleEndimeChange}
            className="time-picker-field"
            minDate={minEndDateTime}
            format="yyyy-MM-dd HH:mm:ss"
          />
          {errors.endTime && (
            <Typography variant="small" color="red" className="font-medium">
              {errors.endTime}
            </Typography>
          )}
        </div>
      </div>

      <div className="">
        <Typography variant="small" color="blue-gray" className=" font-medium">
          Enter Appointment URL
        </Typography>
        <Input
          size="lg"
          placeholder="Enter Appointment URL"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          name="appointmentURL"
          value={formData.appointmentURL}
          onChange={handleChange}
          error={!!errors.appointmentURL}
        />
        {errors.appointmentURL && (
          <Typography variant="small" color="red" className="font-medium">
            {errors.appointmentURL}
          </Typography>
        )}
      </div>

      <div className="">
        <Typography variant="small" color="blue-gray" className="font-medium">
          Enter Description
        </Typography>
        <Textarea
          size="lg"
          placeholder="Enter Description"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
        />
        {errors.description && (
          <Typography variant="small" color="red" className="font-medium">
            {errors.description}
          </Typography>
        )}
      </div>
      <div>
        <Button
          className="flex justify-center items-center gap-1"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding' : 'Add'}
          <HashLoader
            color={'#ffffff'}
            loading={isSubmitting}
            size={15}
            aria-label="Registering..."
            data-testid="register-button"
          />
        </Button>
      </div>
    </form>
  );
};

export default AddSlot;
