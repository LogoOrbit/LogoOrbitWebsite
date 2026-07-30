export default function Testimonials() {
  const testimonials = [
    {
      name: 'Rusk Jones',
      company: 'The Sealant Guys',
      text: 'John helped me a lot in brainstorming ideas and getting the final files within hours. Excellent work & service.',
      rating: 5,
    },
    {
      name: 'Rebecca Rowe',
      company: 'Planticious',
      text: 'Their logo maker is awesome. I would highly recommend this site to businesses looking for complete brand identity.',
      rating: 5,
    },
    {
      name: 'Alan Mekinley',
      company: 'Battlefield',
      text: 'It was my first experience with any online logo maker tool, and it went great. Thank you!',
      rating: 5,
    },
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          Video Testimonials
        </h2>
        <p className="text-center text-gray-100 mb-16 text-lg">
          Join 1,000+ happy customers who used our services and grew their business.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="card-hover p-8 bg-white rounded-xl shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-bold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl p-12 inline-block">
            <p className="text-6xl font-bold gradient-text mb-2">4.5 ★</p>
            <p className="text-gray-600">Rated by 8,503 customers globally</p>
          </div>
        </div>
      </div>
    </section>
  )
}
