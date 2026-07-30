import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-md">
      <nav className="container-custom flex justify-between items-center py-4">
        <Link href="/">
          <span className="text-3xl font-bold gradient-text cursor-pointer">LogoOrbit</span>
        </Link>

        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          ☰
        </button>

        <ul className={`md:flex gap-8 items-center ${isOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 flex-col md:flex-row`}>
          <li><Link href="#portfolio"><a className="hover:text-blue-600 transition">Portfolio</a></Link></li>
          <li><Link href="#about"><a className="hover:text-blue-600 transition">About</a></Link></li>
          <li><Link href="#pricing"><a className="hover:text-blue-600 transition">Pricing</a></Link></li>
          <li><Link href="#services"><a className="hover:text-blue-600 transition">Services</a></Link></li>
          <li><Link href="#contact"><a className="btn-primary">Call Now</a></Link></li>
        </ul>
      </nav>
    </header>
  )
}
