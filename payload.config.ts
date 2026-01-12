import services from './collections/services';
import users from './collections/users';
import roles from './collections/roles';
import diensten from './globals/diensten';

/**
 * Basic Payload config to enable editing of `diensten` (group of services)
 * The project originally used a JSON-based CMS; this file adds Payload
 * configuration for a `services` collection and a `diensten` global.
 *
 * NOTE: You must install `payload` and a database driver (MongoDB recommended)
 * and set `MONGODB_URI` and `PAYLOAD_SECRET` in your environment before
 * starting Payload.
 */
export default {
  collections: [services, users, roles],
  globals: [diensten],
  admin: {
    user: 'users',
  },
};
// This file is no longer needed - we're using a simple JSON-based CMS instead
// See lib/cms-config.ts and public/cms-data.json for the CMS configuration

