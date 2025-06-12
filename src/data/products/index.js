import { PRODUCTS as OUTER_PRODUCTS } from './outer'
import { PRODUCTS as TOP_PRODUCTS } from './top'
import { PRODUCTS as BOTTOM_PRODUCTS } from './bottom'
import { PRODUCTS as SHOES_PRODUCTS } from './shoes'
import { PRODUCTS as WALLET_PRODUCTS } from './wallet'
import { PRODUCTS as BAG_PRODUCTS } from './bag'
import { PRODUCTS as WATCH_PRODUCTS } from './watch'
import { PRODUCTS as ACC_PRODUCTS } from './acc'

export const ALL_PRODUCTS = {
  ...SHOES_PRODUCTS,
  ...BAG_PRODUCTS,
  ...OUTER_PRODUCTS,
  ...TOP_PRODUCTS,
  ...BOTTOM_PRODUCTS,
  ...WALLET_PRODUCTS,
  ...WATCH_PRODUCTS,
  ...ACC_PRODUCTS,
}