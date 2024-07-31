import { API_URL, authService } from '@/services/authService';
import axios from 'axios';
import { countries } from 'countries-list';
import { useEffect, useState } from 'react';
import {
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from '@material-tailwind/react';
import { toast } from 'react-toastify';
import ReactSelect from 'react-select';
import { HashLoader } from 'react-spinners';

const Profile = () => {
  const user = authService.getCurrentUser();
  const [isUpdating, setIsUpdating] = useState(false);
  const countryList = Object.values(countries).map((country) => ({
    value: country.name,
    label: country.name,
  }));
  const [specializations, setSpecializations] = useState([]);
  const [profilePath, setProfilePath] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    counselorTitle: '',
    counselorDescription: '',
    specializations: [],
  });

  const [errors, setErrors] = useState({
    name: '',
    country: '',
    counselorTitle: '',
    counselorDescription: '',
    specializations: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' });
  };
  const handleSpecializationChange = (selectedOptions) => {
    setFormData({
      ...formData,
      specializations: selectedOptions.map((option) => option.value),
    });
    setErrors({ ...errors, specializations: '' });
  };

  const handleChangeProfile = async (event) => {
    const formData = new FormData();
    formData.append('profilePhoto', event.target.files[0]);

    try {
      const response = await axios.post(
        `${API_URL}/user/profile-photo`,
        formData
      );
      toast.success(response.data.message);
      setProfilePath(response.data.data.profilePhoto);
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : 'Something went wrong.'
      );
      console.error('Error uploading file:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...errors };
    if (!formData.name) {
      newErrors.name = 'Please enter name.';
      valid = false;
    }
    if (!formData.country) {
      newErrors.appointmentURL = 'Please select country.';
      valid = false;
    }
    if (user.role === 'counselor') {
      if (!formData.counselorTitle) {
        newErrors.counselorTitle = 'Please enter your title.';
        valid = false;
      }
      if (!formData.counselorDescription) {
        newErrors.counselorDescription = 'Please describe youself.';
        valid = false;
      }
      if (!formData.specializations.length > 0) {
        newErrors.specializations = 'Please select specialization.';
        valid = false;
      }
    }

    setErrors(newErrors);

    if (!valid) {
      return;
    }

    try {
      setIsUpdating(true);
      const response = await axios.put(`${API_URL}/user/${user.id}`, {
        ...formData,
      });
      setIsUpdating(false);
      toast.success(response.data.message);
    } catch (error) {
      setIsUpdating(false);
      toast.error(
        error.response ? error.response.data.message : 'Something went wrong.'
      );
      console.error('Error during updating profile:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/${user.id}`);
        const userData = response.data.data;
        setProfilePath(userData.profilePhoto);
        if (user.role === 'counselor') {
          setFormData({
            name: userData.name,
            country: userData.country,
            counselorTitle: userData.counselorTitle,
            counselorDescription: userData.counselorDescription,
            specializations: userData.specializations,
          });
        } else {
          setFormData({
            name: userData.name,
            country: userData.country,
            profilePath: userData.profilePhoto,
            profileFile: null,
            counselorTitle: '',
            counselorDescription: '',
            specializations: '',
          });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUserData();
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get(`${API_URL}/specialization`, {
          noAuth: true,
        });
        const specializationResponse = response.data.data.map(
          (specialization) => ({
            value: specialization.id,
            label: specialization.name,
          })
        );
        setSpecializations(specializationResponse);
      } catch (error) {
        console.error('Error fetching specializations:', error);
      }
    };
    fetchSpecializations();
  }, []);

  return (
    <div className="profile-wrapper">
      <div className="profile-photo">
        <img src={profilePath} alt="" />
        <label
          htmlFor="icon-button-file"
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Change Profile
        </label>
        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={handleChangeProfile}
          style={{ display: 'none' }}
        />
      </div>
      <form
        className="profile-form flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="">
          <Typography
            variant="small"
            color="blue-gray"
            className=" font-medium"
          >
            Name
          </Typography>
          <Input
            size="lg"
            placeholder="Enter Full Name"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
          />
          {errors.name && (
            <Typography variant="small" color="red" className="font-medium">
              {errors.name}
            </Typography>
          )}
        </div>

        <div>
          <Typography variant="small" color="blue-gray" className="font-medium">
            Select country
          </Typography>
          <ReactSelect
            isClearable={true}
            isSearchable={true}
            name="country"
            value={countryList.filter(
              (option) => formData.country === option.value
            )}
            options={countryList}
            onChange={(value) => {
              setFormData({ ...formData, country: value.value });
              setErrors({ ...errors, country: '' });
            }}
          />
          {errors.country && (
            <Typography variant="small" color="red" className="font-medium">
              {errors.country}
            </Typography>
          )}
        </div>

        {user.role === 'counselor' && (
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Counselor Title
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your title"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              name="counselorTitle"
              value={formData.counselorTitle}
              onChange={handleChange}
              error={!!errors.counselorTitle}
            />
          </div>
        )}

        {user.role === 'counselor' && (
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Counselor Description
            </Typography>
            <Textarea
              size="lg"
              placeholder="Describe yourself"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              name="counselorDescription"
              value={formData.counselorDescription}
              onChange={handleChange}
              error={!!errors.counselorDescription}
            />
          </div>
        )}

        {user.role === 'counselor' && (
          <div className="">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Select Specialization
            </Typography>
            <ReactSelect
              isMulti
              isClearable={true}
              isSearchable={true}
              name="specializations"
              value={specializations.filter((option) =>
                formData.specializations.includes(option.value)
              )}
              options={specializations}
              onChange={handleSpecializationChange}
            />
            {errors.specializations && (
              <Typography variant="small" color="red" className="font-medium">
                {errors.specializations}
              </Typography>
            )}
          </div>
        )}
        <div>
          <Button
            className="flex justify-center items-center gap-1"
            type="submit"
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating' : 'Update'}
            <HashLoader
              color={'#ffffff'}
              loading={isUpdating}
              size={15}
              aria-label="Updating..."
              data-testid="update-profile-button"
            />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
