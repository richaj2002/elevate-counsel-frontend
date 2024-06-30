import {
  Button,
  Input,
  Textarea,
  Select,
  Option,
  Checkbox,
} from '@material-tailwind/react';

const ContactUs = () => {
  return (
    <div className="bg-white">
      {/* Main Heading Section */}
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">
          Best Online Counselling in India
        </h1>
        <p className="text-lg mb-6">
          Talk to a Counsellor 1-on-1 with 100% Privacy
        </p>
        <Button color="green" ripple={true} className="mb-4">
          Book an Appointment
        </Button>
        <img
          src="/path/to/illustration.png"
          alt="Counselling Illustration"
          className="mx-auto mt-4"
        />
      </section>

      {/* Contact Us Form Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-4">Contact Us</h2>
        <p className="text-center text-lg mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <form className="max-w-lg mx-auto space-y-4">
          <div className="flex space-x-4">
            <Input
              label="First name"
              type="text"
              placeholder=""
              required
              className="flex-1"
            />
            <Input
              label="Last name"
              type="text"
              placeholder=""
              required
              className="flex-1"
            />
          </div>
          <div className="flex space-x-4">
            <Input
              label="Email"
              type="email"
              placeholder=""
              required
              className="flex-1"
            />
            <Input
              label="Phone number"
              type="tel"
              placeholder=""
              required
              className="flex-1"
            />
          </div>
          <Select label="Choose a topic" required>
            <Option value="topic1">Topic 1</Option>
            <Option value="topic2">Topic 2</Option>
            <Option value="topic3">Topic 3</Option>
          </Select>
          <Textarea label="Your Thoughts" placeholder="" required />
          <Checkbox label="I accept the terms" required />
          <Button type="submit" color="green" ripple={true} fullWidth>
            Submit
          </Button>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;
