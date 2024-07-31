import { Link, NavLink, useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { navData } from '@/components/layouts/dashboardNavData';
import { useEffect, useRef } from 'react';
import { confirmAlert } from 'react-confirm-alert';

const DashboardSideNav = ({
  isMobileSideNavBehaviourEnable,
  showMobileSideNav,
  setShowMobileSideNav,
}) => {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();
  const sideNavRef = useRef(null);

  const data = {
    path: '/add-slot',
    title: 'Add Slot',
    header: 'Add Slot',
    authRole: ['counselor'],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      ></svg>
    ),
  };

  const logout = () => {
    authService.logout();
    navigate('/sign-in');
  };

  const confirmLogout = () => {
    confirmAlert({
      title: 'Confirm to logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => logout(),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    if (isMobileSideNavBehaviourEnable) {
      const handleClickOutside = (event) => {
        if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
          setShowMobileSideNav(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isMobileSideNavBehaviourEnable, setShowMobileSideNav]);

  return (
    <div
      ref={sideNavRef}
      className={`min-w-60 bg-purple-200 text-black min-h-screen flex flex-col transition-transform transform ${
        isMobileSideNavBehaviourEnable
          ? `fixed top-0 left-0 z-50 ${
              showMobileSideNav ? 'translate-x-0' : '-translate-x-full'
            }`
          : 'relative translate-x-0'
      }`}
    >
      <Link to="/" className="p-3 text-center text-xl font-bold">
        Elevate Counsel
      </Link>
      <div className="flex flex-col p-3 space-y-2">
        {navData.map(
          (item, index) =>
            (item.authRole.length === 0 ||
              item.authRole.includes(user.role)) && (
              <NavLink
                key={index}
                to={`/dashboard${item.path}`}
                end={item.path === ''}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded hover:bg-white transition-colors ${
                    isActive ? 'bg-white' : ''
                  }`
                }
                onClick={() => {
                  if (isMobileSideNavBehaviourEnable) {
                    setShowMobileSideNav(false);
                  }
                }}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="text-sm">{item.title}</span>
              </NavLink>
            )
        )}
        <div
          className="flex items-center p-3 rounded hover:bg-white transition-colors "
          onClick={confirmLogout}
        >
          <span className="mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="text-sm">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardSideNav;
