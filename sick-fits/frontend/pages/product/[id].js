/**
 * [id].js is next.js specific syntax.
 * It makes any routes (/product/[id]) render this template.
 * This gives us a props.query param called 'id' we can use to lookup items in the database.
    Note: you can nest these using the syntax: folder/[subfolderparam]/[fileparam].js and get those in the props 
*/

import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage({ query }) {
  return <SingleProduct id={query.id} />;
}
