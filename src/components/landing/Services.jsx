import { Button, Card, Typography, CardBody } from '@material-tailwind/react';

const Services = () => {
  const services = [
    {
      title: 'Communication',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit semper.',
    },
    {
      title: 'Teamwork',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit semper.',
    },
    {
      title: 'Problem-Solving',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit semper.',
    },
    {
      title: 'Career Exploration',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit semper.',
    },
    {
      title: 'Career Exploration',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit semper.',
    },
    {
      title: 'Career Exploration',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit semper.',
    },
  ];

  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">
          You have lots of reasons to choose us
        </h1>
        <p className="text-lg mb-6">
          Lorem ipsum dolor sit amet consectetur adipiscing elit morbi et
          posuere mollis et aliquam ultricies.
        </p>
        <Button color="green" ripple={true} className="mb-4">
          Book an Appointment
        </Button>
        <img
          src="/path/to/illustration.png"
          alt="Illustration"
          className="mx-auto mt-4"
        />
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-4">
          Services we provide
        </h2>
        <p className="text-center text-lg mb-8">
          Lorem ipsum dolor sit amet consectetur adipiscing elit semper dolor
          elementum tempus hac tellus libero accumsan.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="max-w-sm mx-auto">
              <CardBody>
                <Typography variant="h5" className="mb-2">
                  {service.title}
                </Typography>
                <Typography>{service.description}</Typography>
                <Button color="green" ripple={true} size="sm" className="mt-4">
                  Learn more
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
