const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <a href="/" className="text-blue-500 underline">
        Go to Home
      </a>
    </div>
  );
};

export default NotFound;
