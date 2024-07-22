import { useParams } from 'react-router-dom';

function ViewSlot() {
  const { id } = useParams();

  return (
    <div>
      <h1>View Slot</h1>
      <p>Slot ID: {id}</p>
    </div>
  );
}

export default ViewSlot;
