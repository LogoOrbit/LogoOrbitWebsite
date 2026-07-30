export default function Services() {
  const services = [
    {
      icon: '🎨',
      name: 'Logo Design',
      description: 'Custom professional logos designed by our expert team',
      url: '#',
    },
    {
      icon: '🌐',
      name: 'Website Design',
      description: 'Responsive and engaging websites that convert visitors',
      url: '#',
    },
    {
      icon: '✏️',
      name: 'Animation',
      description: 'Dynamic animations that bring your brand to life',
      url: '#',
    },
    {
      icon: '📱',
      name: 'Mobile App Design',
      description: 'User-friendly mobile applications for iOS and Android',
      url: '#',
    },
    {
      icon: '📚',
      name: 'Book Publication',
      description: 'Professional book design and publishing services',
      url: '#',
    },
    {
      icon: '🛍️',
      name: 'Amazon Marketing',
      description: 'Strategic marketing solutions for Amazon sellers',
      url: '#',
    },
  ]

  return (
    <section className="section-padding bg-gray-50" id="services">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">
          Our Services
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
          Complete branding solutions for your business needs
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="card-hover p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="text-6xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">{service.name}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <a href={service.url} className="text-blue-600 font-semibold hover:text-purple-600 transition">
                Learn More →
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="btn-primary">Explore All Services</button>
        </div>
      </div>
    </section>
  )
}
