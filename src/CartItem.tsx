import type { Product } from './types'
import { formatPrice } from './format'
import { RemoveIcon } from './Icons'

type Props = {
  product: Product
  quantity: number
  onRemove: () => void
}

const CartItem = ({ product, quantity, onRemove }: Props) => {
  const subtotal = product.price * quantity
  return (
    <li className="cart-item">
      <div className="cart-item__body">
        <p className="cart-item__name">{product.name}</p>
        <p className="cart-item__meta">
          <span>
            <span className="cart-item__meta-qty">{quantity}x</span>{' '}
            <span>@ {formatPrice(product.price)}</span>
          </span>
          <span className="cart-item__subtotal">{formatPrice(subtotal)}</span>
        </p>
      </div>
      <button
        type="button"
        className="cart-item__remove"
        onClick={onRemove}
        aria-label={`Remove ${product.name} from cart`}
      >
        <RemoveIcon className="cart-item__remove-icon" />
      </button>
    </li>
  )
}

export default CartItem
