import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-purple-200 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">BeWise4Career</h2>
            <p className="mb-2">
              Don&#39;t Suffer Alone. Share with us. Get the support you need,
              right here, right now.
            </p>
            <p>
              Email:{' '}
              <a
                href="mailto:bewiseforcareer@gmail.com"
                className="text-blue-500"
              >
                bewiseforcareer@gmail.com
              </a>
            </p>
            <p>
              Email:{' '}
              <a href="mailto:knpoonam09@gmail.com" className="text-blue-500">
                knpoonam09@gmail.com
              </a>
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            {/* <ul>
                    <li className="mb-2"><a href="#home" className="text-gray-700 hover:text-blue-500">Home</a></li>
                    <li className="mb-2"><a href="#services" className="text-gray-700 hover:text-blue-500">Services</a></li>
                    <li className="mb-2"><a href="#about" className="text-gray-700 hover:text-blue-500">About Us</a></li>
                    <li className="mb-2"><a href="#contact" className="text-gray-700 hover:text-blue-500">Contact Us</a></li>
                </ul> */}
            <ul>
              <li className="mb-2">
                <Link to="/" className="text-gray-700 hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/services"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Services
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/about-us"
                  className="text-gray-700 hover:text-blue-500"
                >
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/contact-us"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Follow us</h2>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#facebook"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#twitter"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#instagram"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#youtube"
                  className="text-gray-700 hover:text-blue-500"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-gray-700">
            &copy; {new Date().getFullYear()} BeWise4Career
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
