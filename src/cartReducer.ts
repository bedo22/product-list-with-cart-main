import type { Cart, CartAction } from './types'

export const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD':
    case 'INC': {
      const current = state[action.name] ?? 0
      return { ...state, [action.name]: current + 1 }
    }
    case 'DEC': {
      const current = state[action.name] ?? 0
      if (current <= 1) {
        const { [action.name]: _, ...rest } = state
        return rest
      }
      return { ...state, [action.name]: current - 1 }
    }
    case 'REMOVE': {
      if (!(action.name in state)) return state
      const { [action.name]: _, ...rest } = state
      return rest
    }
    case 'RESET':
      return {}
  }
}

export const totalQuantity = (cart: Cart): number =>
  Object.values(cart).reduce((sum, qty) => sum + qty, 0)
