import { PRODUCTS as BAG_PRODUCTS } from './bag'
import { PRODUCTS as OUTER_PRODUCTS } from './outer'
import { PRODUCTS as TOP_PRODUCTS } from './top'
import { PRODUCTS as BOTTOM_PRODUCTS } from './bottom'
import { PRODUCTS as WALLET_PRODUCTS } from './wallet'

export const ALL_PRODUCTS = {
  ...BAG_PRODUCTS,
  ...OUTER_PRODUCTS,
  ...TOP_PRODUCTS,
  ...BOTTOM_PRODUCTS,
  ...WALLET_PRODUCTS,
}