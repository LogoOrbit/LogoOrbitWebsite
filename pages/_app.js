import '../styles/globals.css'
import { CartProvider } from '../lib/cart'

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp
