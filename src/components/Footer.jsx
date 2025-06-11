import { Github, Twitter, Facebook, Instagram, Mail, Phone } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About MyShop Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">
              MyShop
            </h3>
            <p className="text-sm opacity-90 max-w-md">
              Discover the ultimate shopping experience with MyShop. Explore a wide range of high-quality products at unbeatable prices, all in one place.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">
              Get in Touch
            </h3>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 opacity-90" />
              <p className="text-sm opacity-90">support@myshop.com</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 opacity-90" />
              <p className="text-sm opacity-90">+123-456-7890</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-white/20 pt-4 text-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Basant Elsaey - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;