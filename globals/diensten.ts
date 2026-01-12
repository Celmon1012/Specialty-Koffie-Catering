const allowClientOrAdmin = ({ req }: any) => {
  const role = req?.user?.role;
  return !!role && (role === 'admin' || role === 'client');
};

const Diensten = {
  slug: 'diensten',
  label: 'Diensten (group)',
  access: {
    read: () => true,
    update: allowClientOrAdmin,
  },
  fields: [
    {
      name: 'services',
      label: 'Services in Diensten',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
  ],
};

export default Diensten;
