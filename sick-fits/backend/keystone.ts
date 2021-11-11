// import .env values to use
import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long user stays signed in - 360days
  secret: process.env.COOKIE_SECRET, // unique to a user
};

// keystone config
export default config({
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
    // schema items go here. lists are resources/entities in the db
  }),
  ui: {
    // TODO: change this for roles
    isAccessAllowed: () => true,
  },
  // TODO: add session values here
});
