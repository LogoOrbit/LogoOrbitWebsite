import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">LogoOrbit</h3>
            <p className="text-gray-400">Your trusted partner for professional design services.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#"><a className="hover:text-white transition">About Us</a></Link></li>
              <li><Link href="#"><a className="hover:text-white transition">Services</a></Link></li>
              <li><Link href="#"><a className="hover:text-white transition">Pricing</a></Link></li>
              <li><Link href="#"><a className="hover:text-white transition">Contact</a></Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="https://logoorbit.net/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="https://logoorbit.net/terms-condition" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Terms & Conditions</a></li>
              <li><Link href="#"><a className="hover:text-white transition">FAQs</a></Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="tel:(917)%20831-1779" className="hover:text-white transition">(917) 831-1779</a></li>
              <li><a href="mailto:support@logoorbit.net" className="hover:text-white transition">support@logoorbit.net</a></li>
              <li>Mon - Fri | 11 AM - 8 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="grid md:grid-cols-2 gap-4 text-center md:text-left text-gray-400 text-sm">
            <p>&copy; 2024 LogoOrbit. All rights reserved.</p>
            <p>RevoluSys Inc | 8 The Green Ste A, Dover, Delaware 19901</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
