import '../styles/globals.css'
import { CartProvider } from '../lib/cart'
import OfferPopupGate from '../components/OfferPopupGate'

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <OfferPopupGate />
    </CartProvider>
  )
}

export default MyApp
