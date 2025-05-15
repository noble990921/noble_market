import { PRODUCTS as BAG_PRODUCTS } from './bag'
import { PRODUCTS as OUTER_PRODUCTS } from './outer'
import { PRODUCTS as WALLET_PRODUCTS } from './wallet'

export const ALL_PRODUCTS = {
  ...BAG_PRODUCTS,
  ...OUTER_PRODUCTS,
  ...WALLET_PRODUCTS,
}