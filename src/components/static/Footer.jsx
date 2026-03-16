import React from "react";
import logo from "../../assets/public/wavepass.png";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="w-full bg-white pt-16 pb-8 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-[#27187E] w-15 h-14 rounded-xl pl-1.5 flex items-center justify-center overflow-hidden">
            <img
              src={logo}
              alt="Wave Pass Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[#2d2080] text-2xl font-bold tracking-tight">
            Wave Pass
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Quick links</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <a href="#" className="hover:text-[#2d2080] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2d2080] transition-colors">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2d2080] transition-colors">
                  Explore Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2d2080] transition-colors">
                  Event Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2d2080] transition-colors">
                  Subscription plan
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Support</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <a href="#" className="hover:text-[#2d2080] transition-colors">
                  Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2d2080] transition-colors">
                  Faq
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2d2080] transition-colors">
                  Legal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2d2080] transition-colors">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2d2080] transition-colors">
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Others</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <a href="#" className="hover:text-[#2d2080] transition-colors">
                  Partners
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2d2080] transition-colors">
                  Community program
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2d2080] transition-colors">
                  Conferences
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2d2080] transition-colors">
                  Affiliate program
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2d2080] transition-colors">
                  Subscription plan
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Need any help?</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 text-gray-500 text-xs leading-relaxed">
                <MapPin size={18} className="text-gray-800 shrink-0" />
                <span>
                  Office address: 204/205 muyibi street, Ajegunle, Olodi Apapa,
                  Lagos, Nigeria.
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-xs">
                <Mail size={18} className="text-gray-800 shrink-0" />
                <a
                  href="mailto:cynthiadymphna04@gmail.com"
                  className="hover:text-[#2d2080]"
                >
                  Email us: cynthiadymphna04@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-xs">
                <Phone size={18} className="text-gray-800 shrink-0" />
                <span>Phone number: +2349014184551</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-xs">
                <Clock size={18} className="text-gray-800 shrink-0" />
                <span>Office hours: 24hrs, Monday - Sunday</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © 2024 Wave pass, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-gray-800 hover:text-[#2d2080] transition-colors"
            >
              <FaXTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-[#2d2080] transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-[#2d2080] transition-colors"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-[#2d2080] transition-colors"
            >
              <AiFillInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
