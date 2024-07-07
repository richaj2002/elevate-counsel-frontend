import { authService } from '@/services/authService';
import { Input, Button, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailVerified = queryParams.get('emailVerified');

    if (emailVerified === 'true') {
      toast.success('Email successfully verified!');
    } else if (emailVerified === 'false') {
      toast.error('Verification failed. Please try again later.');
    }

    const user = authService.getCurrentUser();
    if (user) {
      navigate('/dashboard');
    }
  }, [location]);

  const [isSigning, setIsSigning] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { ...errors };

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

    setErrors(newErrors);

    if (!valid) {
      return;
    }

    try {
      setIsSigning(true);
      await authService.login(formData.email, formData.password);
      setIsSigning(false);
      navigate('/dashboard');
    } catch (error) {
      // Handle network errors or other exceptions
      setIsSigning(false);
      toast.error(
        error.response ? error.response.data.message : 'Something went wrong.'
      );
      console.error('Error during signing :', error);
    }
  };

  return (
    <section className="flex justify-center items-center gap-4 p-8 min-h-screen">
      <div className="w-full lg:w-3/5">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Sign In
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email and password to Sign In.
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
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
              Password
            </Typography>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
          </div>
          <Button
            className="mt-6 flex justify-center items-center gap-1"
            fullWidth
            type="submit"
            disabled={isSigning}
          >
            {isSigning ? 'Signing' : 'Sign In'}
            <HashLoader
              color={'#ffffff'}
              loading={isSigning}
              size={15}
              aria-label="Signing..."
              data-testid="signing-button"
            />
          </Button>

          <Typography
            variant="small"
            className="text-center font-medium text-gray-900 mt-4"
          >
            <a href="#">Forgot Password</a>
          </Typography>

          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            Not registered?
            <Link to="/user-sign-up" className="text-gray-900 ml-1">
              Create account
            </Link>
          </Typography>

          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            Become Counselor?
            <Link to="/counselor-sign-up" className="text-gray-900 ml-1">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
