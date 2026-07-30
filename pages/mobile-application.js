import ServicePage from '../components/ServicePage'
import { servicePages } from '../lib/pages'

export default function Page() {
  return <ServicePage page={servicePages['mobile-application']} />
}
