import { forwardRef } from 'react'
import type { CartEntry } from './Cart'
import { formatPrice } from './format'
import { OrderConfirmedIcon } from './Icons'

type Props = {
  entries: CartEntry[]
  total: number
  onStartNew: () => void
}

const OrderModal = forwardRef<HTMLDialogElement, Props>(
  ({ entries, total, onStartNew }, ref) => (
    <dialog ref={ref} className="modal" aria-labelledby="modal-title">
      <OrderConfirmedIcon className="modal__icon" />
      <h2 id="modal-title" className="modal__title">Order Confirmed</h2>
      <p className="modal__subtitle">We hope you enjoy your food!</p>

      <div className="modal__summary">
        <ul className="modal__list">
          {entries.map(({ product, quantity }) => {
            const subtotal = product.price * quantity
            return (
              <li key={product.name} className="modal-item">
                <img
                  className="modal-item__thumbnail"
                  src={product.image.thumbnail}
                  alt=""
                />
                <div className="modal-item__body">
                  <p className="modal-item__name">{product.name}</p>
                  <p className="modal-item__meta">
                    <span className="modal-item__meta-qty">{quantity}x</span>
                    <span>@ {formatPrice(product.price)}</span>
                  </p>
                </div>
                <p className="modal-item__subtotal">{formatPrice(subtotal)}</p>
              </li>
            )
          })}
        </ul>
        <div className="modal__total">
          <span className="modal__total-label">Order Total</span>
          <span className="modal__total-value">{formatPrice(total)}</span>
        </div>
      </div>

      <button
        type="button"
        className="confirm-button modal__action"
        onClick={onStartNew}
        aria-label="Start new order"
      >
        Start New Order
      </button>
    </dialog>
  ),
)

OrderModal.displayName = 'OrderModal'

export default OrderModal
