// UI Components
import ProductCard from '../components/ProductCard'
import CategoriesLinks from '../components/CategoriesLinks'

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PRODUCT } from '../utils/queries';

// Shopping Cart
import { useCart } from '../context/CartContext'

const Product = () => {

  const { onAddToCart } = useCart()

  const { productId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, {
    // pass URL parameter
    variables: { productId: productId },
  });

  const product = data?.product || {};
  const productTitle = loading ? 'Loading Product...' : data?.product.title;
  console.log(`Product: products = ${data}`)

  return (
    <>
      <div className='w-75 border m-2 p-5'>
        <h1>{productTitle}</h1>
        <div className='section-title'>

          <ProductCard key={product.title} {...product} onAddToCart={() => onAddToCart(product)} />

        </div>
      </div>
      <div className='w-25 border m-2 p-5'>
        <div className='section-title'>
          Browse the Shop
        </div>
        <CategoriesLinks />
      </div>
    </>
  )
}

export default Product