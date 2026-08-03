import ServicePage from '../components/ServicePage'
import { servicePages } from '../lib/pages'
import { serviceRelations } from '../lib/relations'

export default function Page(props) {
  return <ServicePage page={servicePages['logo-design']} {...props} />
}

export function getStaticProps() {
  return { props: serviceRelations('logo-design') }
}
