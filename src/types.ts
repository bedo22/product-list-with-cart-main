export type Product = {
  image: {
    thumbnail: string
    mobile: string
    tablet: string
    desktop: string
  }
  name: string
  category: string
  price: number
}

export type Cart = Record<string, number>

export type CartEntry = {
  name: string
  quantity: number
}

export type CartAction =
  | { type: 'ADD'; name: string }
  | { type: 'INC'; name: string }
  | { type: 'DEC'; name: string }
  | { type: 'REMOVE'; name: string }
  | { type: 'RESET' }
