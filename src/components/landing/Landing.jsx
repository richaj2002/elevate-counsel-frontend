import { Route, Routes } from 'react-router-dom';
import NavBar from '@/components/layouts/NavBar';
import Footer from '@/components/layouts/Footer';
import Home from '@/components/landing/Home';
import Services from '@/components/landing/Services';
import Counselors from '@/components/landing/Counselors';
import AboutUs from '@/components/landing/AboutUs';
import ContactUs from '@/components/landing/ContactUs';
import SignIn from '@/components/landing/SignIn';
import CounselorSignUp from '@/components/landing/CounselorSignUp';
import UserSignUp from '@/components/landing/UserSignUp';
import NotFound from '@/components/utils/NotFound';

export const Landing = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/counselors" element={<Counselors />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/counselor-sign-up" element={<CounselorSignUp />} />
        <Route path="/user-sign-up" element={<UserSignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Landing;
