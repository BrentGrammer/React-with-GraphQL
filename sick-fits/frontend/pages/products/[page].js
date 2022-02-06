/**
 * [page].js is next.js specific syntax.
 * It makes any routes (/products/[page]) render this template.
 * This gives us a props.query param called 'id' we can use to lookup items in the database.
    Note: you can nest these using the syntax: folder/[subfolderparam]/[fileparam].js and get those in the props 
*/

// we want the products page component to render on three urls - home, /products and /products/[page]
export { default } from './index';
