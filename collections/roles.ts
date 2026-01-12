const Roles = {
  slug: 'roles',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
  ],
};

export default Roles;
