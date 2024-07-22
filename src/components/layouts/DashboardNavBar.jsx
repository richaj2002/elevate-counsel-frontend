import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { navData } from '@/components/layouts/dashboardNavData';

const DashboardNavBar = ({
  isMobileSideNavBehaviourEnable,
  setShowMobileSideNav,
}) => {
  const location = useLocation();
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const logout = () => {
    authService.logout();
    navigate('/sign-in');
  };

  const currentNavItem =
    navData.find((item) => `/dashboard${item.path}` === location.pathname) ||
    {};

  return (
    <div className="sticky top-0 flex justify-between items-center py-2 bg-gray-200">
      <div className="flex items-center">
        {isMobileSideNavBehaviourEnable && (
          <button
            onClick={() => setShowMobileSideNav((prev) => !prev)}
            className="mr-2 p-2 bg-gray-300 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm1 4a1 1 0 0 0 0 2h16a1 1 0 1 0 0-2H4z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
        <span className="text-gray-900 font-bold text-2xl">
          {location.pathname === '/dashboard'
            ? `Hello ${user.name}`
            : currentNavItem.header}
        </span>
      </div>
      <div className="flex gap-1 space-x-4 p-3 bg-gray-300 rounded-md">
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6ZM8.05 14.943a33.54 33.54 0 0 0 3.9 0 2 2 0 0 1-3.9 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="logout" onClick={logout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavBar;
