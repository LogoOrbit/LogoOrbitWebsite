import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { money, salesTax } from './pricing'
import { site, whatsapp } from './site'

/**
 * The cart.
 *
 * Everything on this site that carries a price - a package card, a bundle, an
 * add-on, a catalogue service, the trademark filing - can be put in here with
 * a quantity, and the whole basket is carried to a checkout page that hands it
 * to a human: over WhatsApp, over the phone, or as an emailed order summary.
 *
 * Nothing is charged here. There is no payment step and deliberately so: every
 * job on LogoOrbit is scoped in a conversation before money changes hands, and
 * a cart that pretends otherwise would be lying about what happens next. What
 * this removes is the retyping - the visitor who wants three things no longer
 * has to describe all three in a WhatsApp message they compose themselves.
 *
 * State lives in localStorage under one versioned key, so a basket survives a
 * refresh and the walk from the pricing page to the checkout, and so a future
 * change to the line shape can bump the version rather than crash on old data.
 */

const STORAGE_KEY = 'logoorbit.cart.v1'

/**
 * The id of the checkout form. A submit button can drive a form from anywhere
 * in the document by naming it, which is how the summary panel and the phone
 * action bar carry their own "Place my order" buttons without the page having
 * to hoist its form state out into shared context. It lives here rather than
 * in the checkout page so importing it does not drag that page's bundle into
 * every other page's build.
 */
export const ORDER_FORM_ID = 'place-order-form'

const slug = (s) => String(s).toLowerCase().replace(/\s+/g, '-')

/**
 * Identity of a line.
 *
 * A sku is already unique on its own - it is the package's own path - so when
 * one is present it is the whole key. Folding the section title in as well
 * would split one product into several lines, because the same package is
 * labelled "Logo" on the pricing page and "Logo Design" on the package index,
 * and a card would then never recognise something the cart already holds.
 * Only the unskued things - where the name is all there is - need the section
 * to tell two same-named cards apart.
 */
export const lineId = (item) => {
  const key = item.sku || item.slug
  return key ? slug(key) : `${slug(item.name)}::${slug(item.group || item.kind || '')}`
}

/**
 * Normalises the many shapes a priced thing takes across the site into the one
 * shape the cart stores. Callers pass whatever their data has; everything
 * except a name and a price is optional.
 */
export function cartLine(item, qty = 1) {
  return {
    id: lineId(item),
    /** Kept on the stored line, not just used to build the id: a basket is read
     *  back out of localStorage through this same function, and without the sku
     *  the id it recomputes on the way back in would not be the id it wrote. */
    sku: item.sku || item.slug || null,
    name: String(item.name),
    kind: item.kind || item.group || 'Package',
    price: Number(item.price) || 0,
    /** "from $149" prices are estimates until the brief is read; the checkout
     *  says so rather than quietly presenting a guess as a quote. */
    from: Boolean(item.from),
    href: item.href || null,
    note: item.note || null,
    qty: Math.max(1, Math.min(99, Math.round(Number(qty) || 1))),
  }
}

/* ------------------------------------------------------------------- totals */

const round2 = (n) => Math.round(n * 100) / 100

/**
 * Subtotal, tax and total for a set of lines.
 *
 * Every product here is a one-off: there are no subscriptions, retainers or
 * care plans on this site, so there is one total and it is the whole bill.
 */
export function cartTotals(items) {
  const subtotal = round2(items.reduce((n, i) => n + i.price * i.qty, 0))
  const tax = round2(subtotal * (salesTax.rate / 100))

  return {
    count: items.reduce((n, i) => n + i.qty, 0),
    lines: items.length,
    subtotal,
    tax,
    total: round2(subtotal + tax),
    /** True when any line is a "from" price, which makes the total an estimate
     *  rather than a quote. The checkout page says as much when it is set. */
    estimated: items.some((i) => i.from),
    taxRate: salesTax.rate,
    taxLabel: salesTax.label,
  }
}

/** $1,234.56, or $1,234 when the cents are zero. Tax lines rarely land flat. */
export const cash = (n) =>
  Number.isInteger(n)
    ? money(n)
    : `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

/* ------------------------------------------------------- the order message */

/**
 * The order, written out as plain text.
 *
 * This is the single source for what gets sent, whichever channel is used:
 * the WhatsApp deep link, the emailed copy and the clipboard button all read
 * from here, so a customer who sends it twice sends the same thing twice.
 */
export function orderSummaryText(items, totals, details = {}, orderNumber = '') {
  const lines = []

  lines.push('Hi LogoOrbit, I would like to order this from your website.')
  lines.push('')

  if (orderNumber) {
    lines.push(`Order number: ${orderNumber}`)
    lines.push('')
  }

  if (details.name) lines.push(`Name: ${details.name}`)
  if (details.email) lines.push(`Email: ${details.email}`)
  if (details.phone) lines.push(`Phone: ${details.phone}`)
  if (details.company) lines.push(`Business: ${details.company}`)
  if (details.name || details.email || details.phone || details.company) lines.push('')

  lines.push(`My selection (${totals.count} item${totals.count === 1 ? '' : 's'}):`)
  items.forEach((item, i) => {
    const unit = `${item.from ? 'from ' : ''}${cash(item.price)}`
    lines.push(
      `${i + 1}. ${item.name} (${item.kind}) - ${item.qty} x ${unit} = ${cash(
        round2(item.price * item.qty)
      )}`
    )
  })

  lines.push('')
  lines.push(`Subtotal: ${cash(totals.subtotal)}`)
  lines.push(`${totals.taxLabel} (${totals.taxRate}%): ${cash(totals.tax)}`)
  lines.push(`Total: ${cash(totals.total)}`)

  if (totals.estimated) {
    lines.push('')
    lines.push('Some items start "from" a price, so please tell me the final price.')
  }

  if (details.message) {
    lines.push('')
    lines.push('Notes:')
    lines.push(details.message)
  }

  lines.push('')
  lines.push('Please confirm the price and tell me what you need to get started.')

  return lines.join('\n')
}

/** wa.me link carrying the whole order in the message box. */
export function orderWhatsAppLink(items, totals, details = {}, orderNumber = '') {
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(
    orderSummaryText(items, totals, details, orderNumber)
  )}`
}

/** mailto fallback, for anyone who does not use WhatsApp. */
export function orderMailtoLink(items, totals, details = {}, orderNumber = '') {
  const subject = orderNumber
    ? `Order ${orderNumber} - ${cash(totals.total)}`
    : `Website order - ${totals.count} item${totals.count === 1 ? '' : 's'}, ${cash(totals.total)}`
  return `mailto:${site.salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    orderSummaryText(items, totals, details, orderNumber)
  )}`
}

/* ---------------------------------------------------------------- provider */

const CartContext = createContext(null)

function readStored() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // Anything that does not still look like a line is dropped rather than
    // trusted: this data is a year old by the time some visitors return.
    return parsed
      .filter((i) => i && typeof i.name === 'string' && Number.isFinite(Number(i.price)))
      .map((i) => cartLine(i, i.qty))
      .slice(0, 40)
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  // The server renders an empty cart, so the first client paint must too or
  // React tears the tree down over a hydration mismatch. `ready` is what the
  // badge and the cart page wait on before showing a count.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setItems(readStored())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* Private browsing, a full quota - not worth breaking the page over. */
    }
  }, [items, ready])

  // A cart open in two tabs should not disagree with itself.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setItems(readStored())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const add = useCallback((item, qty = 1) => {
    const line = cartLine(item, qty)
    setItems((prev) => {
      const found = prev.find((i) => i.id === line.id)
      if (!found) return [...prev, line]
      return prev.map((i) =>
        i.id === line.id ? { ...i, qty: Math.min(99, i.qty + line.qty) } : i
      )
    })
    return line
  }, [])

  const setQty = useCallback((id, qty) => {
    const next = Math.round(Number(qty) || 0)
    setItems((prev) =>
      next <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(99, next) } : i))
    )
  }, [])

  const remove = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), [])
  const clear = useCallback(() => setItems([]), [])
  const has = useCallback((item) => items.some((i) => i.id === lineId(item)), [items])
  const qtyOf = useCallback(
    (item) => items.find((i) => i.id === lineId(item))?.qty || 0,
    [items]
  )

  const totals = useMemo(() => cartTotals(items), [items])

  const value = useMemo(
    () => ({ items, totals, ready, add, setQty, remove, clear, has, qtyOf }),
    [items, totals, ready, add, setQty, remove, clear, has, qtyOf]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/**
 * Cart access for any component. Falls back to a working no-op cart if a
 * component is rendered outside the provider, so a stray Add-to-cart button
 * degrades to an inert one rather than throwing the page away.
 */
export function useCart() {
  const ctx = useContext(CartContext)
  if (ctx) return ctx
  return {
    items: [],
    totals: cartTotals([]),
    ready: false,
    add: () => {},
    setQty: () => {},
    remove: () => {},
    clear: () => {},
    has: () => false,
    qtyOf: () => 0,
  }
}
