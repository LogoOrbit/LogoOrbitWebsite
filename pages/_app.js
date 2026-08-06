import '../styles/globals.css'
import { CartProvider } from '../lib/cart'
import OfferPopupGate from '../components/OfferPopupGate'
import LiveChat from '../components/LiveChat'

/**
 * The live chat launcher is mounted here rather than in Layout, which is
 * where the other floating buttons live. A page swap tears Layout down and
 * builds it again; this component holds the unread badge and the loader
 * state for an open conversation, and neither should reset because somebody
 * clicked through to the pricing page mid-question.
 */
function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <OfferPopupGate />
      <LiveChat />
    </CartProvider>
  )
}

export default MyApp
