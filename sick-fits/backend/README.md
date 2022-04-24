# Backend

- `npm run dev`

See browser Keystone CMS dashboard in `http://localhost:3000`

## Keystone

- Builtin CMS UI and backend library
- Builtin GraphQL API

## Seeding Data for development:

- run `npm run seed-data`
- start the app with `npm run dev`

## Database

- Open MongoDBCompass and enter credentials (database string)
  - Database registered with Mongo Atlas
  - login to mongo atlas with google brentonmarquez@gmail.com

# GraphQL API

- Click on ellipsis menu by your account name and `Open API Explorer` to write queries for testing.
- Route for graphql query editor: `http://localhost:3000/api/graphql`
- user is brent@gmail.com, pass is 12345678

## Packages:

- apollo upload client - needed since file uploads are not standardized in graphql querying - this helps us pass a file to a query.
