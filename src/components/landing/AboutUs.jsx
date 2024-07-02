import { Button, Card, Typography, Avatar } from "@material-tailwind/react";

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* Main Heading Section */}
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Best Online Counselling in India</h1>
        <p className="text-lg mb-6">Talk to a Counsellor 1-on-1 with 100% Privacy</p>
        <p className="text-sm mb-6">Don't Suffer Alone. Share with us. Get the support you need, right here, right now.</p>
        <Button color="green" ripple={true} className="mb-4">Book an Appointment</Button>
        <img src="/path/to/illustration.png" alt="Counselling Illustration" className="mx-auto mt-4" />
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-4">Top Career and Soft Skills Counseling Services</h2>
        <p className="text-center text-lg mb-8">
          Talk to a certified counselor for career and soft skills improvement in just a few clicks. No matter what stage you're at in your career, our counselors can help you navigate through challenges and reach your goals. 
        </p>
        <div className="flex justify-center">
          <img src="/path/to/services-illustration.png" alt="Services Illustration" className="mx-auto mt-4" />
        </div>
        <p className="text-center text-lg mt-8">
          We offer personalized counseling sessions to help you improve your skills, boost your confidence, and achieve your professional goals.
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-12">
        <h2 className="text-2xl font-bold text-center mb-4">Testimonial</h2>
        <p className="text-center text-lg mb-8">Lorem ipsum dolor sit amet consectetur adipiscing elit semper dolor elementum turpis hac tellus libero accumsan.</p>
        <div className="container mx-auto flex flex-wrap justify-center gap-8">
          {[
            {
              name: "John Carter",
              position: "CEO at Company",
              testimony: "An amazing service",
              img: "/path/to/avatar1.png"
            },
            {
              name: "Sophie Moore",
              position: "Manager at Company",
              testimony: "One of a kind service",
              img: "/path/to/avatar2.png"
            },
            {
              name: "Andy Smith",
              position: "Director at Company",
              testimony: "The best service",
              img: "/path/to/avatar3.png"
            }
          ].map((testimonial, index) => (
            <Card key={index} className="w-full max-w-sm p-6">
              <Avatar src={testimonial.img} alt={testimonial.name} size="lg" className="mx-auto mb-4" />
              <Typography variant="h6" color="blue-gray" className="text-center mb-2">{testimonial.name}</Typography>
              <Typography variant="subtitle1" className="text-center mb-4">{testimonial.position}</Typography>
              <Typography className="text-center">{testimonial.testimony}</Typography>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
