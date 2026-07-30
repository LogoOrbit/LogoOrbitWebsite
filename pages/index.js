import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import WhyUs from '../components/WhyUs'
import Services from '../components/Services'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>LogoOrbit - Online Logo Maker & Custom Design Services</title>
        <meta name="description" content="Get a custom logo made in minutes. Professional logo design, website design, and digital services by LogoOrbit." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="logo design, custom logo, website design, logo maker, branding, design services" />
        <meta property="og:title" content="LogoOrbit - Online Logo Maker & Custom Design Services" />
        <meta property="og:description" content="Professional logo design and digital services at logoorbit.net" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://logoorbit.net" />
      </Head>

      <Header />
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}
