import type { Product, Cart, CartAction } from './types'
import { AddToCartIcon, DecrementIcon, IncrementIcon } from './Icons'
import { formatUnit } from './format'

type Props = {
  product: Product
  cart: Cart
  dispatch: (action: CartAction) => void
}

const ProductCard = ({ product, cart, dispatch }: Props) => {
  const quantity = cart[product.name] ?? 0
  const inCart = quantity > 0

  return (
    <article className={`product-card${inCart ? ' product-card--in-cart' : ''}`}>
      <div className="product-card__media">
        <picture>
          <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
          <img
            className="product-card__image"
            src={product.image.mobile}
            alt={product.name}
          />
        </picture>
        <div className="product-card__action">
          {inCart ? (
            <div className="stepper" role="group" aria-label={`Quantity of ${product.name}`}>
              <button
                type="button"
                className="stepper__button"
                onClick={() => dispatch({ type: 'DEC', name: product.name })}
                aria-label={`Decrease ${product.name} quantity`}
              >
                <DecrementIcon className="stepper__icon" />
              </button>
              <span className="stepper__value">{quantity}</span>
              <button
                type="button"
                className="stepper__button"
                onClick={() => dispatch({ type: 'INC', name: product.name })}
                aria-label={`Increase ${product.name} quantity`}
              >
                <IncrementIcon className="stepper__icon" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="add-button"
              onClick={() => dispatch({ type: 'ADD', name: product.name })}
              aria-label={`Add ${product.name} to cart`}
            >
              <AddToCartIcon className="add-button__icon" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <p className="product-card__name">{product.name}</p>
        <p className="product-card__price">{formatUnit(product.price)}</p>
      </div>
    </article>
  )
}

export default ProductCard
