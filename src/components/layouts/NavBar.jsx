import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between p-5 bg-purple-200 text-black shadow-lg">
      <div className="flex items-center">
        <img src="" alt="BeWise4Career" className="h-10" />
        <span className="ml-3 text-xl font-bold">BeWise4Career</span>
      </div>
      {/* <ul className="flex items-center space-x-6">
        <li><a href="/" className="hover:text-purple-700">Home</a></li>
        <li><a href="/services" className="hover:text-purple-700">Services</a></li>
        <li><a href="/about-us" className="hover:text-purple-700">About Us</a></li>
        <li><a href="/contact-us" className="hover:text-purple-700">Contact</a></li>
    </ul> */}
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
        <Button color="green" ripple={true}>
          Login
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
