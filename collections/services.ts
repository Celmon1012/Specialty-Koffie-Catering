const allowClientOrAdmin = ({ req }: any) => {
  const role = req?.user?.role;
  return !!role && (role === 'admin' || role === 'client');
};

const Services = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  admin: { useAsTitle: 'title' },
  access: {
    create: allowClientOrAdmin,
    read: () => true,
    update: allowClientOrAdmin,
    delete: allowClientOrAdmin,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'summary', type: 'textarea' },
    { name: 'price', type: 'number' },
  ],
};

export default Services;
