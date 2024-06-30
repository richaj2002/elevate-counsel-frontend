import { Button } from '@material-tailwind/react';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Main Heading Section */}
      <section className="container bg-white mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">
          Best Online Counselling in India
        </h1>
        <p className="text-lg mb-6">
          Talk to a Counsellor 1-on-1 with 100% Privacy
        </p>
        <p className="text-md mb-8">
          Don&#39;t Suffer Alone. Share with us. Get the support you need, right
          here, right now.
        </p>
        <Button color="green" ripple={true} className="mb-4 mx-2">
          Book an Appointment
        </Button>
      </section>

      {/* What is Online Counseling Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">What is Online Counseling?</h2>
        <p className="text-lg mb-6">
          With the changing times and technological advancements, online
          counseling has emerged as a highly effective method for addressing a
          wide range of mental health and personal development issues. In
          today&#39;s fast-paced world, few have the time to commute for
          traditional counseling sessions.
        </p>
        <p className="text-lg mb-6">
          Additionally, mental health issues remain a taboo subject for many in
          India, creating a demand for a convenient, discreet solution. Online
          counseling with BeWise4Career offers the perfect answer by allowing
          you to discuss your problems anonymously from the comfort of your
          home.
        </p>
        <p className="text-lg mb-6">
          At BeWise4Career, you provide a certified and verified platform where
          you can seek help from professional counselors without revealing your
          identity. Our goal is to offer a safe space for you to share your
          deepest concerns and receive the support you need. BeWise4Career
          connects you with India&#39;s best counselors, psychologists, and
          therapists in one place.
        </p>
      </section>

      {/* How Does Online Counseling Work Section */}
      <section className="bg-white-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">
            How Does Online Counseling Work?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img
                src="/path/to/your/step1.png"
                alt="Step 1"
                className="mx-auto mb-4"
              />
              <p className="text-lg">Book A Counselling Plan</p>
            </div>
            <div>
              <img
                src="/path/to/your/step2.png"
                alt="Step 2"
                className="mx-auto mb-4"
              />
              <p className="text-lg">Choose A Counselor & Pick A Time</p>
            </div>
            <div>
              <img
                src="/path/to/your/step3.png"
                alt="Step 3"
                className="mx-auto mb-4"
              />
              <p className="text-lg">Join The Session & Chat Afterwards</p>
            </div>
            <div>
              <img
                src="/path/to/your/step4.png"
                alt="Step 4"
                className="mx-auto mb-4"
              />
              <p className="text-lg">
                Reschedule Or Change Counselor If Needed
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
