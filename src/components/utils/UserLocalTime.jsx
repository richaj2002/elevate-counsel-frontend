const UserLocalTime = ({ utcTime }) => {
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  const utcDate = new Date(utcTime);
  const userLocalTime = utcDate.toLocaleString('en-IN', options);

  return <span>{userLocalTime}</span>;
};

export default UserLocalTime;
