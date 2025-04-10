import Vue from 'vue'
import accounting from 'accounting-js'

Vue.filter('formatNumber', (val, precision = 'auto', placeholder = '0') => {
  if (val) {
    if (precision == 'auto') {
      val = String(Number(val));
      const pIdx = val.indexOf('.')
      precision = pIdx === -1 ? 0 : val.length - (pIdx + 1)
    }
    return accounting.formatMoney(val, {
      symbol: '',
      precision: precision,
      decimal: '.',
      thousand: ','
    })
  } else {
    return placeholder
  }
})