import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 pt-20 flex items-center justify-center overflow-hidden">
      <div className="container-custom grid md:grid-cols-2 gap-12 items-center py-20">
        <div className="text-white order-2 md:order-1">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Online Logo Maker & Custom Design Services
          </h1>
          <p className="text-xl mb-8 text-gray-100 leading-relaxed">
            Get a Custom Logo Made in just 03:00 minutes. Try our innovative design platform today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary bg-white text-primary hover:bg-gray-100">
              Try Now
            </button>
            <button className="btn-secondary border-white text-white hover:bg-white hover:text-blue-600">
              Learn More
            </button>
          </div>
          <p className="text-sm text-gray-200 mt-8">⭐ Trusted by 1,000+ happy customers</p>
        </div>

        <div className="order-1 md:order-2 relative">
          <div className="bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="space-y-4">
              <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-4xl font-bold">🎨</span>
              </div>
              <p className="text-center text-gray-600 font-semibold">Professional Logo Design</p>
              <p className="text-center text-sm text-gray-500">Custom made by expert designers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
