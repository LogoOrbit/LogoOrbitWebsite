/**
 * Money formatting and the sales-tax rate.
 *
 * These three are separated from lib/pricing.js on purpose. Almost every
 * component that shows a price needs `money` or `salesTax` and nothing else,
 * but importing them from the catalogue dragged the whole 46 KB package list
 * into that page's bundle - the header, the footer and the offer popup were
 * each shipping the full price book to render a dollar sign. Splitting the
 * helpers out means a component pays for the formatter alone.
 *
 * lib/pricing.js re-exports all three, so `import { money } from './pricing'`
 * still works for anything that genuinely needs the catalogue too.
 */

export const money = (n) => `$${n.toLocaleString('en-US')}`

/**
 * Sales tax, kept in one place so a rate change is one edit rather than a
 * hunt through every price on the site. Every figure quoted on LogoOrbit is
 * the pre-tax figure; the tax is added at invoice.
 */
export const salesTax = {
  rate: 8.25,
  label: 'California sales tax',
  /** The one-liner that sits under a price or a row of package cards. */
  short: 'Prices do not include California sales tax of 8.25%. We add it to the invoice.',
  /** The fuller line, for a page that shows a total rather than a price. */
  long: 'Every price here is before tax. California sales tax of 8.25% is added to your invoice where it applies.',
}

/** A price with tax applied, rounded to the cent. */
export const withTax = (n) => Math.round(n * (1 + salesTax.rate / 100) * 100) / 100
