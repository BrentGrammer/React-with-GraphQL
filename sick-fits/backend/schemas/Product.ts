import { integer, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
/**
 * configuration for the Product schema with settings for CMS fields
 */
export const Product = list({
  // TODO
  // access:
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea', // in CMS
      },
    }),
    // don't want to show product if it is under development/draft
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Unavailable', value: 'UNAVAILABLE' },
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control', // ??
        createView: { fieldMode: 'hidden' }, // ex: optional if you want a quick create view and hide the status etc. when creating (if you want)
      },
    }),
    price: integer(),
    // TODO photo
  },
});
