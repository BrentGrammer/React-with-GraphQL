// import .env values to use - need this for env vars
import 'dotenv/config';
import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';

const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'sickfits',
};

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
    // Setup 2-way relationship - relate the productImage here to a product record with a matching photo field
    // In the other related entity, Product Schema we also add a product field that references this product field for a photo
    product: relationship({ ref: 'Product.photo' }),
  },
  ui: {
    // show columns with more info about the record in CMS - useful for setup for clients to easily see what the record is, otherwise just the id is shown in the list in the CMS board
    listView: {
      initialColumns: ['image', 'altText', 'product'],
    },
  },
});
