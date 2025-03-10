import React from "react";
import logo from "/logo.png"; // Corrected path for public assets
import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-[#012615] to-[#015b35] text-white p-8 md:px-16 ">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Logo & Description */}
          <div className="md:w-1/3">
            <img src={logo} alt="Logo" className="w-32 mb-4" />
            <p className="text-sm text-gray-300">
            Welcome to NovelNest – Your One-Stop Book Haven!
            Discover a vast collection of books, from timeless classics to the latest bestsellers. Whether you’re looking for brand-new releases or pre-loved treasures, we’ve got something for every reader.
            </p>
            <Link to="/about" className="mt-4 inline-block text-gray-300 hover:text-white transition-all">
              About Us →
            </Link>
          </div>

          {/* Follow Us Section */}
          <div className="md:w-1/4">
            <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-300 transition-all"><FaFacebookSquare className="text-2xl"/></a>
              <a href="#" className="hover:text-gray-300 transition-all"><FaSquareXTwitter className="text-2xl"/></a>
              <a href="#" className="hover:text-gray-300 transition-all"><FaInstagramSquare className="text-2xl"/></a>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="md:w-1/4">
            <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
            <input type="email" name="email" placeholder="Your Email..." className="w-full p-2 bg-gray-800 rounded-lg text-white mb-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" />
            <textarea
              name="message"
              id="message"
              rows={2}
              className="w-full p-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your message..."
            ></textarea>
            <button className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all">
              Send Message
            </button>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-600 mt-8 pt-4 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} BookStore. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
