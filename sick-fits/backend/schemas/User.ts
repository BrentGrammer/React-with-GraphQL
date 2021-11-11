import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship } from '@keystone-next/fields';
/**
 * Schema for user entity and config for keystone editor in CMS dashboard (port 3000)
 */

export const User = list({
  // access:
  // ui - whether user can view ui
  fields: {
    name: text({
      isRequired: true,
      // isIndexed: true - use this if you're searching on this field alot for performance
    }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    // TODO: add roles cart and orders
  },
});
