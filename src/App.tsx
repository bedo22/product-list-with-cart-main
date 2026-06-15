import { useMemo, useReducer, useRef } from 'react'
import productsJson from '../data.json'
import { cartReducer, totalQuantity } from './cartReducer'
import type { Product } from './types'
import ProductList from './ProductList'
import Cart, { type CartEntry } from './Cart'
import OrderModal from './OrderModal'

const products = productsJson as Product[]
const productsByName = new Map(products.map(p => [p.name, p]))

const App = () => {
  const [cart, dispatch] = useReducer(cartReducer, {})
  const dialogRef = useRef<HTMLDialogElement>(null)

  const entries = useMemo<CartEntry[]>(() => {
    return Object.entries(cart)
      .map(([name, quantity]) => {
        const product = productsByName.get(name)
        return product ? { product, quantity } : null
      })
      .filter((entry): entry is CartEntry => entry !== null)
  }, [cart])

  const total = entries.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0,
  )
  const count = totalQuantity(cart)

  const openModal = () => dialogRef.current?.showModal()
  const closeModal = () => dialogRef.current?.close()

  return (
    <>
      <main className="app">
        <h1 className="app__title">Desserts</h1>
        <div className="layout">
          <ProductList products={products} cart={cart} dispatch={dispatch} />
          <Cart
            entries={entries}
            total={total}
            count={count}
            dispatch={dispatch}
            onConfirm={openModal}
          />
        </div>
      </main>
      <OrderModal
        ref={dialogRef}
        entries={entries}
        total={total}
        onStartNew={() => {
          dispatch({ type: 'RESET' })
          closeModal()
        }}
      />
    </>
  )
}

export default App
