import '../styles/globals.css'
import { CartProvider } from '../lib/cart'
import OfferPopup from '../components/OfferPopup'

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <OfferPopup />
    </CartProvider>
  )
}

export default MyApp
