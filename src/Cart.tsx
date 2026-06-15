import type { Product, CartAction } from './types'
import { formatPrice } from './format'
import CartItem from './CartItem'
import emptyCart from '../assets/images/illustration-empty-cart.svg'
import { CarbonNeutralIcon } from './Icons'

export type CartEntry = { product: Product; quantity: number }

type Props = {
  entries: CartEntry[]
  total: number
  count: number
  dispatch: (action: CartAction) => void
  onConfirm: () => void
}

const Cart = ({ entries, total, count, dispatch, onConfirm }: Props) => {
  const isEmpty = entries.length === 0

  return (
    <aside className="cart" aria-label="Cart">
      <h2 className="cart__heading">
        Your Cart (<span aria-live="polite">{count}</span>)
      </h2>

      {isEmpty ? (
        <div className="cart__empty">
          <img
            className="cart__empty-illustration"
            src={emptyCart}
            alt=""
          />
          <p className="cart__empty-text">Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul className="cart__list">
            {entries.map(({ product, quantity }) => (
              <CartItem
                key={product.name}
                product={product}
                quantity={quantity}
                onRemove={() => dispatch({ type: 'REMOVE', name: product.name })}
              />
            ))}
          </ul>
          <div className="cart__carbon-neutral">
            <CarbonNeutralIcon className="cart__carbon-neutral-icon" />
            <p>
              This is a <strong>carbon-neutral</strong> delivery
            </p>
          </div>
          <div className="cart__total">
            <span className="cart__total-label">Order Total</span>
            <span className="cart__total-value">{formatPrice(total)}</span>
          </div>
          <button
            type="button"
            className="confirm-button"
            onClick={onConfirm}
            aria-label="Confirm order"
          >
            Confirm Order
          </button>
        </>
      )}
    </aside>
  )
}

export default Cart
