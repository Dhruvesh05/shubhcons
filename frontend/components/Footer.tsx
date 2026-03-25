"use client";

import Link from "next/link";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1c1f26] text-gray-300 pt-14 relative px-4"
    role="contentinfo">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        <div className="max-w-sm ">
          <h2 className="text-2xl font-bold text-red-700">
            Shubh Construction
          </h2>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Trusted civil and industrial construction company in Bharuch, Gujarat,
delivering quality projects on time.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="font-semibold mb-4 text-red-700">Quick Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-red-700 cursor-pointer transition-all duration-300 text-sm"><Link href="/about-us">About Us</Link></li>
            <li className="hover:text-red-700 cursor-pointer transition-all duration-300 text-sm"><Link href="/services">Services</Link></li>
            <li className="hover:text-red-700 cursor-pointer transition-all duration-300 text-sm"><Link href="/project">Projects</Link></li>
            <li className="hover:text-red-700 cursor-pointer transition-all duration-300 text-sm"><Link href="/contact-us">Contact Us</Link></li>
            <li className="hover:text-red-700 cursor-pointer transition-all duration-300 text-sm"><Link href="/careers">Careers</Link></li>
          </ul>
        </nav>

        <div>
          <h3 className="font-semibold mb-4 text-red-700">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Industrial Civil Projects</li>
            <li>Industrial Mechanical Projects</li>
            <li>Commercial Buildings</li>
            <li>Renovations & Remodeling</li>
          </ul>
        </div>

        <div className="pr-5">
          <address className="not-italic">
          <h3 className="font-semibold mb-4 text-red-700">Contact Us</h3>
          <div className="space-y-3 text-sm">
            <a href="tel:+919601940724" className="flex items-center gap-3 hover:scale-105 transition-all duration-300">
              <FaPhoneAlt className="text-red-700" />
              <span>+91 9601940724</span>
            </a>
            
            <a href="mailto:J.talpada@shubhconstructions.com" className="flex items-center gap-3 hover:scale-105 transition-all duration-300">
              <FaEnvelope className="text-red-700" />
              <span>J.talpada@shubhconstructions.com</span>
            </a>
            <Link href="https://www.google.com/maps/place/Narayan+Luxuria+Apartments/@21.7271251,72.9798989,17z/data=!3m1!4b1!4m6!3m5!1s0x395f89fcb679fb4d:0xab516380da2eac86!8m2!3d21.7271201!4d72.9824738!16s%2Fg%2F12hmyyb35?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:scale-103 transition-all duration-300">
              <FaMapMarkerAlt className="text-red-700 mt-1 text-xl" />
              <span>Office No. C-408, Narayan Luxuria, Umraj, Bharuch, Gujarat 392015</span>
            </Link>
          </div>
          </address>
          <div className="flex gap-4 mt-5">
            <Link rel="noopener noreferrer nofollow"
  aria-label="Shubh Construction on Facebook"
   href="https://www.facebook.com/shubhconstruction2017/"
    target="_blank"><FaFacebookF className="hover:scale-120 hover:text-red-700 cursor-pointer transition-all duration-400" ></FaFacebookF></Link>
            <Link rel="noopener noreferrer nofollow"
  aria-label="Shubh Construction on Twitter"
   href="https://www.twitter.com" 
   target="_blank"><FaTwitter className="hover:scale-120 hover:text-red-700 cursor-pointer transition-all duration-400" ></FaTwitter></Link>
            <Link rel="noopener noreferrer nofollow"
  aria-label="Shubh Construction on Linkdin"
   href="https://in.linkedin.com/in/shubh-construction-85850791" 
   target="_blank"><FaLinkedinIn className="hover:scale-120 hover:text-red-700 cursor-pointer transition-all duration-400" ></FaLinkedinIn></Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12"></div>

      <div className="text-center py-6 text-sm text-gray-400">
        ©{new Date().getFullYear()} Shubh Construction. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
