export default function About() {
  return (
    <section className="section-padding bg-gray-50" id="about">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 h-96 flex items-center justify-center shadow-lg">
              <span className="text-white text-8xl">🎨</span>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              About LogoOrbit
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              LogoOrbit has proven to be the hallmark of dedication and perfection in creating artistic custom logo designs for startups and SMEs from diversified industries. With over 15+ years of working experience with genius entrepreneurs and multinational ventures, we have successfully delivered excellence into every brand mark we designed.
            </p>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Our well-versed in-house design team is equipped with highly ingenious, professional, and robust logo designers who are adept at creating hand-crafted designs to satisfy your custom needs. We guarantee that our designs are original and uniquely tailored to meet the strategic goals of your company.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <p className="text-4xl font-bold gradient-text">15+</p>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold gradient-text">1000+</p>
                <p className="text-gray-600">Happy Clients</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold gradient-text">100%</p>
                <p className="text-gray-600">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
