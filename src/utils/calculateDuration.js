const calculateDuration = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const durationMs = end - start;
  const durationMins = Math.floor(durationMs / (1000 * 60));

  return `${durationMins} min`;
};

export default calculateDuration;
