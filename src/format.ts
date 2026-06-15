const fmtUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export const formatPrice = (n: number): string => fmtUSD.format(n)

export const formatUnit = (n: number): string => formatPrice(n)
