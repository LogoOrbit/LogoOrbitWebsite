import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import TrustBar from '../../components/TrustBar'
import AnimationReel from '../../components/AnimationReel'
import Testimonials from '../../components/Testimonials'
import CTA from '../../components/CTA'
import { breadcrumb, collectionPageSchema } from '../../lib/seo'

const description =
  'Logo animation concepts drawn and animated in-house by LogoOrbit, showing the build styles we design for websites, video intros and app splash screens.'

export default function AnimationPortfolioPage() {
  const jsonLd = {
    '@graph': [
      collectionPageSchema({
        path: '/portfolio/animation',
        name: 'LogoOrbit logo animation portfolio',
        description,
      }),
      breadcrumb([
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Logo animation', href: '/portfolio/animation' },
      ]),
    ],
  }

  return (
    <Layout
      title="Logo Animation Portfolio"
      description={description}
      path="/portfolio/animation"
      jsonLd={jsonLd}
    >
      <PageHero
        eyebrow="Logo animation portfolio"
        title="The same mark, but"
        highlight="in motion"
        intro="Concept marks our team drew and animated to show the styles we build in, from draw-on builds to looping traces."
        trail={[
          { name: 'Portfolio', href: '/portfolio' },
          { name: 'Logo animation' },
        ]}
      />

      <TrustBar />
      <AnimationReel showHeading={false} />
      <Testimonials />
      <CTA />
    </Layout>
  )
}

export function getStaticProps() {
  return { props: {} }
}
