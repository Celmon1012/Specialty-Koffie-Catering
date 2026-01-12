// Minimal payload server that supports TypeScript config files.
require('ts-node/register');
try {
  require('dotenv').config({ path: './.env.local' });
} catch (e) {
  try { require('dotenv').config(); } catch (e) {}
}

const express = require('express');
const net = require('net');
const payloadPkg = require('payload');
const payload = payloadPkg && payloadPkg.init ? payloadPkg : payloadPkg.default || payloadPkg;

const app = express();

function canTcpConnect(host, port, timeoutMs = 800) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let settled = false;

    const finish = (ok) => {
      if (settled) return;
      settled = true;
      try { socket.destroy(); } catch (e) {}
      resolve(ok);
    };

    socket.setTimeout(timeoutMs);
    socket.once('connect', () => finish(true));
    socket.once('timeout', () => finish(false));
    socket.once('error', () => finish(false));

    try {
      socket.connect(port, host);
    } catch (e) {
      finish(false);
    }
  });
}

function parseMongoHostPort(mongoUri) {
  if (typeof mongoUri !== 'string') return null;
  if (!mongoUri.startsWith('mongodb://')) return null;
  const afterScheme = mongoUri.slice('mongodb://'.length);
  const firstSlash = afterScheme.indexOf('/');
  const authority = (firstSlash === -1 ? afterScheme : afterScheme.slice(0, firstSlash)).split('?')[0];
  const withoutCreds = authority.includes('@') ? authority.split('@').pop() : authority;
  // Only handle single-host URIs like mongodb://localhost:27017/db
  if (!withoutCreds || withoutCreds.includes(',')) return null;
  const [hostPart, portPart] = withoutCreds.split(':');
  if (!hostPart || !portPart) return null;
  const port = Number(portPart);
  if (!Number.isFinite(port)) return null;
  return { host: hostPart, port };
}

async function maybeEnableInMemoryMongo() {
  const mongoUri = process.env.MONGODB_URI;
  const parsed = parseMongoHostPort(mongoUri);
  if (!parsed) return;

  const isLocalHost = parsed.host === 'localhost' || parsed.host === '127.0.0.1' || parsed.host === '::1';
  if (!isLocalHost) return;

  const reachable = await canTcpConnect(parsed.host === '::1' ? '127.0.0.1' : parsed.host, parsed.port);
  if (reachable) return;

  // If a local MongoDB was configured but it's not running, fall back to in-memory MongoDB
  // so developers can boot Payload without installing MongoDB.
  let MongoMemoryReplSet;
  try {
    ({ MongoMemoryReplSet } = require('mongodb-memory-server'));
  } catch (e) {
    console.error('Local MongoDB is not reachable and mongodb-memory-server is not installed.');
    console.error('Either start MongoDB on the configured port or install mongodb-memory-server.');
    process.exit(1);
  }

  console.log(`Local MongoDB not reachable at ${parsed.host}:${parsed.port}; starting in-memory MongoDB...`);
  const replSet = await MongoMemoryReplSet.create({
    replSet: { count: 1 },
    instanceOpts: [{ storageEngine: 'wiredTiger' }],
  });
  const memUri = replSet.getUri();
  process.env.MONGODB_URI = memUri;
  console.log('In-memory MongoDB started.');

  const shutdown = async () => {
    try { await replSet.stop(); } catch (e) {}
  };
  process.once('SIGINT', () => shutdown().finally(() => process.exit(0)));
  process.once('SIGTERM', () => shutdown().finally(() => process.exit(0)));
 }

async function start() {
  if (!process.env.MONGODB_URI || !process.env.PAYLOAD_SECRET) {
    console.error('MONGODB_URI and PAYLOAD_SECRET must be set in the environment');
    process.exit(1);
  }

  await maybeEnableInMemoryMongo();

  let config;
  try {
    try {
      config = require('./payload.config.cjs');
      console.log('Loaded payload.config.cjs');
    } catch (e) {
      config = require('./payload.config');
      console.log('Loaded payload.config (ts or js)');
    }
    config = config && config.default ? config.default : config;
  } catch (e) {
    console.log('No local payload.config found; aborting.');
    console.error(e && e.stack ? e.stack : e);
    process.exit(1);
  }

  // Ensure secret is present on config
  config = { ...config, secret: process.env.PAYLOAD_SECRET };

  try {
    await payload.init({ mongoURL: process.env.MONGODB_URI, express: app, config });
    const port = process.env.PAYLOAD_PORT || 3001;
    app.listen(port, () => console.log(`Payload Admin available at http://localhost:${port}/admin`));
  } catch (err) {
    console.error('Failed to start Payload:', err && err.stack ? err.stack : err);
    process.exit(1);
  }
}

start();
