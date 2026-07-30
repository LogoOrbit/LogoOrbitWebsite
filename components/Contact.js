import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you! We will contact you soon.')
    setFormData({ name: '', email: '', phone: '', service: '', message: '' })
  }

  return (
    <section className="section-padding bg-white" id="contact">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">
          Need Help?
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
          With our affordable logo maker & custom design services, you get expert advice. Let's get connected!
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-800">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="text-3xl">📞</span>
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <a href="tel:+19178311779" className="text-blue-600 hover:text-purple-600">(917) 831-1779</a>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">📧</span>
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <a href="mailto:support@logoorbit.net" className="text-blue-600 hover:text-purple-600">support@logoorbit.net</a>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">🕐</span>
                <div>
                  <p className="font-semibold text-gray-800">Business Hours</p>
                  <p className="text-gray-600">Mon - Fri | 11 AM - 8 PM</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">📍</span>
                <div>
                  <p className="font-semibold text-gray-800">Address</p>
                  <p className="text-gray-600">8 The Green Ste A, Dover, Delaware 19901</p>
                  <p className="text-gray-600">244 5th Ave. Suite 22, NY, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
              required
            >
              <option value="">Select a Service</option>
              <option value="logo">Logo Design</option>
              <option value="website">Website Design</option>
              <option value="animation">Animation</option>
              <option value="mobile">Mobile App</option>
              <option value="book">Book Publication</option>
              <option value="amazon">Amazon Marketing</option>
            </select>
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 resize-none"
            ></textarea>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" required />
              I agree to the Privacy Policy & Terms & Conditions
            </label>
            <button type="submit" className="btn-primary w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
