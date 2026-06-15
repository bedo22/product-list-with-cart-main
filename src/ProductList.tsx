import type { Product, Cart, CartAction } from './types'
import ProductCard from './ProductCard'

type Props = {
  products: Product[]
  cart: Cart
  dispatch: (action: CartAction) => void
}

const ProductList = ({ products, cart, dispatch }: Props) => (
  <section className="product-list" aria-label="Desserts">
    {products.map(product => (
      <ProductCard key={product.name} product={product} cart={cart} dispatch={dispatch} />
    ))}
  </section>
)

export default ProductList
