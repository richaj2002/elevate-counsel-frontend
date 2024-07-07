import { useState, useEffect } from 'react';
import { Input, Checkbox, Button, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { countries } from 'countries-list';
import axios from 'axios';
import { API_URL } from '@/services/authService';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import Select from 'react-select';

const CounselorSignUp = () => {
  const navigate = useNavigate();
  const countryList = Object.values(countries).map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [isRegistering, setIsRegistering] = useState(false);
  const [specializations, setSpecializations] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    counselorTitle: '',
    counselorDescription: '',
    specialization: [],
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    specialization: '',
    agreeToTerms: '',
    passwordMismatch: false,
  });

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get(`${API_URL}/specialization`);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSpecializationChange = (selectedOptions) => {
    setFormData({
      ...formData,
      specialization: selectedOptions.map((option) => option.value),
    });
    setErrors({ ...errors, specialization: '' });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { ...errors };
    newErrors.passwordMismatch = false;
    if (!formData.name) {
      newErrors.name = 'Please enter name.';
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Please enter email.';
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter valid email.';
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = 'Please enter password.';
      valid = false;
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password.';
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.passwordMismatch = true;
      valid = false;
    }
    if (!formData.country) {
      newErrors.country = 'Please select country.';
      valid = false;
    }
    if (!formData.specialization.length > 0) {
      newErrors.specialization = 'Please select specialization.';
      valid = false;
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions.';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      return;
    }

    try {
      setIsRegistering(true);
      const response = await axios.post(
        `${API_URL}/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          country: formData.country,
          counselorTitle: formData.counselorTitle,
          counselorDescription: formData.counselorDescription,
          specialization: formData.specialization,
          role: 'counselor',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setIsRegistering(false);
      toast.success(response.data.message);
      navigate('/sign-in');
    } catch (error) {
      // Handle network errors or other exceptions
      setIsRegistering(false);
      toast.error(
        error.response ? error.response.data.message : 'Something went wrong.'
      );
      console.error('Error during registration:', error);
    }
  };

  return (
    <section className="p-8 flex justify-center items-center">
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Join Us Today
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter details to register.
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Enter name
            </Typography>
            <Input
              size="lg"
              placeholder="Alex Fizz"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
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
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Enter email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
            />
            {errors.email && (
              <Typography variant="small" color="red" className="font-medium">
                {errors.email}
              </Typography>
            )}
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Enter password
            </Typography>
            <div className="relative">
              <Input
                size="lg"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <Typography variant="small" color="red" className="font-medium">
                {errors.password}
              </Typography>
            )}

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Confirm password
            </Typography>
            <div className="relative">
              <Input
                size="lg"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <Typography variant="small" color="red" className="font-medium">
                {errors.confirmPassword}
              </Typography>
            )}
            {errors.passwordMismatch && (
              <Typography variant="small" color="red" className="font-medium">
                Passwords do not match.
              </Typography>
            )}

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Select country
            </Typography>
            <Select
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

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Select Specialization
            </Typography>
            <Select
              isMulti
              isClearable={true}
              isSearchable={true}
              options={specializations}
              name="specialization"
              value={specializations.filter((option) =>
                formData.specialization.includes(option.value)
              )}
              onChange={handleSpecializationChange}
            />
            {errors.specialization && (
              <Typography variant="small" color="red" className="font-medium">
                {errors.specialization}
              </Typography>
            )}

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Counselor Title
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your title"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              name="counselorTitle"
              value={formData.counselorTitle}
              onChange={handleChange}
              error={!!errors.counselorTitle}
            />

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Counselor Description
            </Typography>
            <Input
              size="lg"
              placeholder="Describe yourself"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              name="counselorDescription"
              value={formData.counselorDescription}
              onChange={handleChange}
              error={!!errors.counselorDescription}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree to the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: '-ml-2.5' }}
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          {errors.agreeToTerms && (
            <Typography variant="small" color="red" className="font-medium">
              {errors.agreeToTerms}
            </Typography>
          )}
          <Button
            className="mt-6 flex justify-center items-center gap-1"
            fullWidth
            type="submit"
            disabled={isRegistering}
          >
            {isRegistering ? 'Registering' : 'Register Now'}
            <HashLoader
              color={'#ffffff'}
              loading={isRegistering}
              size={15}
              aria-label="Registering..."
              data-testid="register-button"
            />
          </Button>
          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            Already have an account?
            <Link to="/sign-in" className="text-gray-900 ml-1">
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
};

export default CounselorSignUp;
