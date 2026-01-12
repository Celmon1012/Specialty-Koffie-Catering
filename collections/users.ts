const Users = {
  slug: 'users',
  auth: { strategies: [] },
  admin: { useAsTitle: 'email' },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'firstName', type: 'text' },
    { name: 'lastName', type: 'text' },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Client', value: 'client' },
      ],
      defaultValue: 'client',
    },
  ],
};

export default Users;
