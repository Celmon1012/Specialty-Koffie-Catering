import payload from 'payload';

/**
 * Run this once to create a client user for the Payload admin UI.
 * Usage (after installing deps and setting env):
 *
 *   npx ts-node scripts/seed-client.ts
 *
 * Make sure `MONGODB_URI` and `PAYLOAD_SECRET` are set in your environment.
 */

async function seed() {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'dev',
    mongoURL: process.env.MONGODB_URI,
    local: true,
    express: null,
  } as any);

  const email = 'client@example.com';
  const existing = await payload.find({ collection: 'users', where: { email: { equals: email } } });
  if (existing.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email,
        password: 'ChangeMe123!',
        role: 'client',
      },
    });
    console.log('Created client user:', email);
  } else {
    console.log('Client user already exists:', email);
  }
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
