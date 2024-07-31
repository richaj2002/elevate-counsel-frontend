import { API_URL } from '@/services/authService';
import { Button } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CounselorSlotDialog from '../layouts/CounselorSlotDialog';

const Counselors = () => {
  const [counselors, setCounselors] = useState([]);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [counselorSlotDialogIsOpen, setCounselorSlotDialogIsOpen] =
    useState(false);

  const openCounselorSlotDialog = (counselor) => {
    setSelectedCounselor(counselor);
    setCounselorSlotDialogIsOpen(true);
  };

  const closeCounselorSlotDialog = () => {
    setCounselorSlotDialogIsOpen(false);
    setSelectedCounselor(null);
  };

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/counselors`, {
          noAuth: true,
        });
        setCounselors(response.data.data);
      } catch (error) {
        console.error('Error fetching counselor:', error);
      }
    };
    fetchCounselors();
  }, []);
  return (
    <div className="bg-white">
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">
          Best Online Counselling in India
        </h1>
        <p className="text-lg mb-6">
          Talk to a Counsellor 1-on-1 or take a group sessions with 100% Privacy
        </p>
      </section>
      <section className="container mx-auto px-4 counselors-grid">
        {counselors.map((counselor) => (
          <div className="counselor-card" key={counselor.id}>
            <img src={counselor.profilePhoto} alt={counselor.name} />
            <h5 className="counselor-name">{counselor.name}</h5>
            <h6 className="counselor-title">{counselor.counselorTitle}</h6>
            <button
              className="appointment-button"
              onClick={() => openCounselorSlotDialog(counselor)}
            >
              Book an appointment
            </button>
          </div>
        ))}
      </section>
      {selectedCounselor && (
        <CounselorSlotDialog
          isOpen={counselorSlotDialogIsOpen}
          onRequestClose={closeCounselorSlotDialog}
          counselor={selectedCounselor}
        />
      )}
    </div>
  );
};

export default Counselors;
