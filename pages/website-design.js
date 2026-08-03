import ServicePage from '../components/ServicePage'
import { servicePages } from '../lib/pages'
import { serviceRelations } from '../lib/relations'

export default function Page(props) {
  return <ServicePage page={servicePages['website-design']} {...props} />
}

export function getStaticProps() {
  return { props: serviceRelations('website-design') }
}
