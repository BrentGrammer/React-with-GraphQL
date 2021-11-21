// import .env values to use
import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  statelessSessions,
  withItemData,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';

/**
 * Keystone configuration - you need to create this file
 * Unless you're using nodemon or hot reload somehow, you need to restart the server on every change
 */

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long user stays signed in - 360days
  secret: process.env.COOKIE_SECRET, // unique to a user
};

// wrap config below with this for auth
const { withAuth } = createAuth({
  listKey: 'User', // which schema is the user schema
  identityField: 'email', // which field identifies the person, ie what do they login with
  secretField: 'password',
  initFirstItem: { fields: ['name', 'email', 'password'] }, // allows insertion of these without auth
});

// keystone config
export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true, // passes cookie
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // TODO: add data seeding here
    },
    lists: createSchema({
      User,
      Product,
      ProductImage,
      // schema items go here. lists are resources/entities in the db
    }),
    ui: {
      // show ui only for users that pass this test
      isAccessAllowed: ({ session }) => !!session?.data, // if session and there is data they are logged in
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // this is a graphql query
      User: 'id', // pass id field and queried data with the session for access, useful for middleware and present on request
    }),
  })
);
