import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import TitleStyles from './styles/Title';
import PriceTagStyles from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';

/* eslint-disable react/prop-types */
export default function Product({ product }) {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <TitleStyles>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </TitleStyles>
      <PriceTagStyles>{formatMoney(product.price)}</PriceTagStyles>
      <p>{product.description}</p>
      <div className="buttonList">
        {/* This is how to link with a url query string parameter: */}
        <Link href={{ pathname: 'update', query: { id: product.id } }}>
          Edit
        </Link>
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </ItemStyles>
  );
}
