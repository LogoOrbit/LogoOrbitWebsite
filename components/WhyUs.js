export default function WhyUs() {
  const features = [
    {
      icon: '✨',
      title: 'Unique & Exclusive Designs',
      description: 'We create unique and timeless logos that establish your brand as a leader in the industry.',
    },
    {
      icon: '⚡',
      title: 'Professionalism with Timeliness',
      description: '15+ years in graphic design. We deliver exceptional services with professionalism and quick turnaround.',
    },
    {
      icon: '🎯',
      title: 'Highly Diversified Portfolio',
      description: 'Proven expertise working with SMEs to multinational corporations across various industries.',
    },
    {
      icon: '✅',
      title: 'Guaranteed Satisfaction',
      description: '100% customer satisfaction rate with round-the-clock support for all your concerns.',
    },
    {
      icon: '👥',
      title: 'In-house Design Team',
      description: 'Our expert designers work tirelessly to create logos that help your brand stand out.',
    },
    {
      icon: '🏢',
      title: 'One Stop Shop',
      description: 'From logos to web design, print media to social campaigns - we have everything covered.',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">
          Why Choose LogoOrbit?
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
          We bring dedication and perfection to every design we create for your brand
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="card-hover p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
