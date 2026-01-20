"use client";

import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Footer component with aligned content and navigation links
 * Provides consistent branding, quick links, and contact information
 */
export default function FooterLayout() {
  const navigate = useNavigate();

  // Navigation links with proper routing
  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Content", path: "/content" },
    { label: "About", path: "/about" },
  ];

  const resources = [
    { label: "Evolution Basics", path: "/content" },
    { label: "Episodes", path: "/content" },
    { label: "Learning Guides", path: "/about" },
    { label: "FAQ", path: "/about" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#14320f] text-white py-12 md:py-16 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-white">Sci-Likha</h2>
            <p className="text-sm text-white/80 leading-relaxed mb-4">
              Exploring evolutionary biology through engaging podcast episodes and educational content.
            </p>
            <p className="text-xs text-white/60">
              © 2025 Sci-Likha. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="text-sm text-white/80 hover:text-white transition-colors duration-200 text-left"
                    aria-label={`Navigate to ${link.label}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.label}>
                  <button
                    onClick={() => handleNavigation(resource.path)}
                    className="text-sm text-white/80 hover:text-white transition-colors duration-200 text-left"
                    aria-label={`Navigate to ${resource.label}`}
                  >
                    {resource.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Connect</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Mail size={18} className="flex-shrink-0" />
                <span>info@scilikha.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Phone size={18} className="flex-shrink-0" />
                <span>+63 (0) 123 456 7890</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <MapPin size={18} className="flex-shrink-0" />
                <span>Manila, Philippines</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="#facebook"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#twitter"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#linkedin"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
            <p>Sci-Likha © 2025. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
