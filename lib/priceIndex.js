/**
 * Server-side list prices, keyed by the same skus the cart stores.
 *
 * The cart lives in the visitor's browser, so a line's price can be edited
 * there. The order endpoint looks each sku up here and uses this price when it
 * knows one. Skus that are not listed keep the submitted price and are flagged
 * in the desk email as unverified.
 */
import { packages } from './packages'
import { catalogServices } from './catalog'
import { addOns, brandProtection, copyrightCertificate } from './pricing'
import { dealRows, informativeCartItem } from './offers'

const index = new Map()
const put = (sku, price) => {
  if (sku && Number.isFinite(Number(price))) index.set(String(sku), Number(price))
}

packages.forEach((p) => put(`/pricing/${p.slug}`, p.price))
catalogServices.forEach((s) => put(`/services/${s.slug}`, s.price))
addOns.items.forEach((a) => put(`add-on-${a.name}`, a.price))
dealRows.forEach((r) => put(r.cartItem?.sku, r.cartItem?.price))
put(informativeCartItem.sku, informativeCartItem.price)
put(copyrightCertificate.href, copyrightCertificate.price)
put('trademark-filing', brandProtection.price)
put('trademark-class', brandProtection.classPrice)

/** The list price for a sku, or null when the sku is not one we know. */
export function listPrice(sku) {
  if (!sku) return null
  const price = index.get(String(sku))
  return price === undefined ? null : price
}
