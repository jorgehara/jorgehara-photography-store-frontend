import React from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaTiktok
} from 'react-icons/fa';

const socialLinks = [
  {
    title: "Instagram",
    link: "https://www.instagram.com/starfottooficial",
    icon: FaInstagram,
    color: "hover:text-pink-600"
  },
  {
    title: "WhatsApp",
    link: "https://wa.me/+543794051686",
    icon: FaWhatsapp,
    color: "hover:text-green-500"
  },
  {
    title: "Facebook",
    link: "https://www.facebook.com/starfottooficial",
    icon: FaFacebook,
    color: "hover:text-blue-600"
  },
  {
    title: "TikTok",
    link: "https://www.tiktok.com/@starfottooficial",
    icon: FaTiktok,
    color: "hover:text-black dark:hover:text-white"
  }
];

const Socials = ({ className }) => {
  return (
    <div className={`${className} flex items-center space-x-4`}>
      {socialLinks.map((social, index) => (
        <motion.a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-full transition-colors duration-300 
            text-gray-600 dark:text-gray-300 ${social.color}`}
          aria-label={social.title}
        >
          <social.icon className="w-6 h-6" />
        </motion.a>
      ))}
    </div>
  );
};

export default Socials;
