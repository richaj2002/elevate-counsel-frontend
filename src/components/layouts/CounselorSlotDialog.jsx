import { API_URL } from '@/services/authService';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import SlotCard from './SlorCard';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const CounselorSlotDialog = ({ isOpen, onRequestClose, counselor }) => {
  const navigate = useNavigate();
  const [counselorSlots, setCounselorSlots] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchCounselorSlots = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/slot/counselor/${counselor.id}`,
          {
            noAuth: true,
          }
        );
        setCounselorSlots(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching counselor slots:', error);
      }
    };
    fetchCounselorSlots();
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          borderRadius: '8px',
          background: '#DDDDDD',
        },
      }}
    >
      <button
        onClick={onRequestClose}
        style={{
          float: 'right',
          fontSize: '1.5rem',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
        }}
      >
        &times;
      </button>
      <div className="counselor-slots">
        <div className="counselor-details">
          <img src={counselor.profilePhoto} alt={counselor.name} />
          <div className="counselor-descriptions">
            <h5 className="counselor-name">{counselor.name}</h5>
            <span className="counselor-title">{counselor.counselorTitle}</span>
            <p className="counselor-description">
              {counselor.counselorDescription}
            </p>
            <h6>From: {counselor.country}</h6>
          </div>
        </div>
        <Tabs value="individual">
          <TabsHeader>
            <Tab key="individual" value="individual">
              Individual Sessions
            </Tab>
            <Tab key="group" value="group">
              Group Sessions
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel key="individual" value="individual">
              {counselorSlots.individualSlots && (
                <div className="p-1 counselor-slot-cards">
                  {counselorSlots.individualSlots.map((slot, index) => (
                    <SlotCard key={index} slot={slot} index={index} />
                  ))}
                </div>
              )}
              {!counselorSlots.individualSlots ||
                (counselorSlots.groupSlots.length === 0 && (
                  <span>No Individuals Sessions By Counselor.</span>
                ))}
            </TabPanel>
            <TabPanel key="group" value="group">
              {counselorSlots.groupSlots && (
                <div className="p-1 counselor-slot-cards">
                  {counselorSlots.groupSlots.map((slot, index) => (
                    <SlotCard key={index} slot={slot} index={index} />
                  ))}
                </div>
              )}
              {!counselorSlots.groupSlots ||
                (counselorSlots.groupSlots.length === 0 && (
                  <span>No group Sessions By Counselor.</span>
                ))}
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </Modal>
  );
};

export default CounselorSlotDialog;
