// src/components/shared/FooterLayout.tsx
"use client";

import { ShoppingCart, RefreshCw, Camera, Search } from "lucide-react";

export default function FooterLayout() {
  return (
    <footer className="bg-[#14320f] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
          <h2 className="font-semibold mb-4 text-lg">About Sci Likha</h2>
          <p className="text-sm mb-2">
            Sci Likha is a platform dedicated to the study and exploration of
            biology. Our mission is to provide academic resources for students
            and researchers, covering scientific discoveries, cell biology,
            genetics, ecosystems, and more.
          </p>
          <p className="text-sm">
            Through our interactive content and guides, learners can understand
            complex biological concepts in an accessible and engaging way.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold mb-4 text-lg">Quick Links</h2>
          <ul className="text-sm space-y-1">
            <li>Home</li>
            <li>Courses</li>
            <li>Articles</li>
            <li>Labs & Experiments</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="font-semibold mb-4 text-lg">Resources</h2>
          <ul className="text-sm space-y-1">
            <li>General Biology</li>
            <li>Microscopy Guides</li>
            <li>Plant & Animal Cells</li>
            <li>Energy & Metabolism</li>
            <li>Scientific Methods</li>
            <li>Research & Experiments</li>
          </ul>
        </div>

        {/* Icons Section */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <ShoppingCart className="w-6 h-6" />
          <RefreshCw className="w-6 h-6" />
          <Camera className="w-6 h-6" />
          <Search className="w-6 h-6" />
        </div>
      </div>
    </footer>
  );
}
