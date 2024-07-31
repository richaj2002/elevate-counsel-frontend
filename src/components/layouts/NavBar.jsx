import { Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const navigateToSignIn = () => {
    navigate('/sign-in');
  };
  return (
    <nav className="flex items-center justify-between p-5 bg-purple-200 text-black shadow-lg">
      <div className="flex items-center">
        {/* <img src="" alt="BeWise4Career" className="h-10" /> */}
        <Link to="/" className="ml-3 text-xl font-bold">
          Elevate Counsel
        </Link>
      </div>
      <ul className="flex items-center space-x-6">
        <li>
          <Link to="/" className="hover:text-purple-700">
            Home
          </Link>
        </li>
        <li>
          <Link to="/services" className="hover:text-purple-700">
            Services
          </Link>
        </li>
        <li>
          <Link to="/counselors" className="hover:text-purple-700">
            Counselors
          </Link>
        </li>
        <li>
          <Link to="/about-us" className="hover:text-purple-700">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/contact-us" className="hover:text-purple-700">
            Contact
          </Link>
        </li>
      </ul>
      <div>
        <Button color="green" ripple={true} onClick={navigateToSignIn}>
          SIGN IN
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
