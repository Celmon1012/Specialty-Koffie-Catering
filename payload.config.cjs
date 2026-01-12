// CommonJS payload config to ensure Node can require it reliably.
// It requires the TypeScript collection files (ts-node/register is enabled).
try {
  require('ts-node/register');
} catch (e) {}

const services = require('./collections/services.ts');
const users = require('./collections/users.ts');
const roles = require('./collections/roles.ts');
const diensten = require('./globals/diensten.ts');

let nodemailerAdapter;
try {
  ({ nodemailerAdapter } = require('@payloadcms/email-nodemailer'));
} catch (e) {
  nodemailerAdapter = undefined;
}
// Use the official MongoDB adapter for Payload (installed as @payloadcms/db-mongodb)
let dbAdapter;
try {
  const dbPkg = require('@payloadcms/db-mongodb');
  const adapterFactory = dbPkg.mongooseAdapter || dbPkg.default || dbPkg;
  // Payload v3's MongoDB adapter expects a `url` (string or false).
  // We wire it from `MONGODB_URI` loaded by `payload-server.js`.
  dbAdapter = adapterFactory({ url: process.env.MONGODB_URI });
} catch (e) {
  dbAdapter = undefined;
}
// Wrap adapter with a logging init function to help debug whether Payload calls `db.init`.
if (dbAdapter) {
  const originalAdapter = dbAdapter;
  dbAdapter = {
    ...originalAdapter,
    init: (args) => {
      try {
        console.log('DEBUG: custom db.init called with keys=', Object.keys(args || {}));
      } catch (e) {}
      return originalAdapter.init ? originalAdapter.init(args) : originalAdapter;
    }
  };
}
// Provide a safe KV adapter fallback so `config.kv.init` always exists
let kvAdapter;
try {
  const payloadPkg = require('payload');
  kvAdapter = payloadPkg.databaseKVAdapter ? payloadPkg.databaseKVAdapter() : undefined;
} catch (e) {
  kvAdapter = undefined;
}

// Normalize collections/globals to ensure adapters see expected properties
const rawCollections = [services && services.default ? services.default : services, users && users.default ? users.default : users, roles && roles.default ? roles.default : roles];
const collections = rawCollections.map((c) => {
  const col = c || {};
  col.upload = col.upload || {};
  col.sanitizedIndexes = col.sanitizedIndexes || [];
  return col;
});
const globals = [diensten && diensten.default ? diensten.default : diensten];

module.exports = {
  collections,
  globals,
  // Provide minimal defaults expected by Payload to avoid runtime errors
  blocks: [],
  typescript: { autoGenerate: false },
  email: nodemailerAdapter ? nodemailerAdapter() : undefined,
  // Database adapter (mongoose). If the adapter failed to load, Payload will error on startup.
  db: dbAdapter,
  kv: kvAdapter,
  admin: { user: 'users' },
};
