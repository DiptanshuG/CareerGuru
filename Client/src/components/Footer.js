import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white py-4 block md:hidden">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex items-center space-x-4">
          {/* Social Icons */}
          <a href="#" className="text-white">
            <FaFacebook className="text-2xl" />
          </a>
          <a href="#" className="text-white">
            <FaTwitter className="text-2xl" />
          </a>
          <a href="#" className="text-white">
            <FaLinkedin className="text-2xl" />
          </a>
          <a href="#" className="text-white">
            <FaEnvelope className="text-2xl" />
          </a>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>
          &copy; {new Date().getFullYear()} Your Job Seeker Website. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
