function About() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-12 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-fade-in">About MyShop</h1>
      <div className="card bg-base-100 shadow-2xl p-10 rounded-2xl w-full max-w-3xl mx-auto animate-fade-in">
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Welcome to MyShop, your one-stop destination for the best in electronics, clothing, accessories, and more! We pride ourselves on providing high-quality products at competitive prices with a seamless shopping experience.
        </p>
        <h2 className="text-3xl font-semibold text-primary mb-6 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Our Mission</h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          To provide our customers with a diverse range of products and exceptional service, making online shopping easy and enjoyable.
        </p>
        <h2 className="text-3xl font-semibold text-primary mb-6 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Contact Us</h2>
        <div className="space-y-4 text-lg text-gray-600">
          <p>Email: <a href="mailto:support@myshop.com" className="text-blue-600 hover:underline">support@myshop.com</a></p>
          <p>Phone: <a href="tel:+11234567890" className="text-blue-600 hover:underline">+1-123-456-7890</a></p>
          <p>Address: 123 Main St, City, Country, USA</p>
        </div>
      </div>
    </div>
  );
}

export default About;