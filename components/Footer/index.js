import React from "react";
import Socials from "../Socials";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  CameraIcon,
  HeartIcon,
  GlobeAltIcon 
} from "@heroicons/react/24/outline";

const Footer = ({ contactRef }) => {
  const { theme } = useTheme();
  const stats = [
    {
      icon: CameraIcon,
      value: "10K+",
      label: "Fotos Entregadas",
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: GlobeAltIcon,
      value: "3",
      label: "Países",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: HeartIcon,
      value: "100%",
      label: "Satisfacción",
      color: "from-cyan-500 to-emerald-500"
    }
  ];

  const contactInfo = [
    {
      icon: PhoneIcon,
      label: "WhatsApp",
      value: "+54 379 405-1686",
      link: "https://wa.me/+543794051686",
      description: "Respuesta inmediata 24/7",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: EnvelopeIcon,
      label: "Email",
      value: "info@starfotto.com",
      link: "mailto:info@starfotto.com",
      description: "Consultas y presupuestos",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: MapPinIcon,
      label: "Ubicación",
      value: "Triple Frontera",
      description: "Argentina • Brasil • Paraguay",
      link: "https://goo.gl/maps/xyz",
      color: "from-purple-500 to-pink-500"
    },
  ];

  return (
    <footer className="relative py-16 md:py-24 bg-gradient-to-b from-transparent to-gray-50 
                     dark:to-gray-900">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Estadísticas */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 dark:text-white">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center dark:text-white"
              >
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${stat.color} mb-4 
                              shadow-lg transform hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sección de Contacto */}
        <div className="py-6">
          <motion.div
            ref={contactRef}
            className="text-center mb-2 scroll-mt-custom"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text mb-6">
              ¡Capturemos Momentos Juntos!
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto dark:text-gray-200">
              Estamos listos para inmortalizar los momentos más emocionantes de tu próximo evento deportivo
            </p>
          </motion.div>

          {/* Grid de información de contacto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{item.label}</h3>
                    <p className="mt-2 font-medium text-gray-800">{item.value}</p>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Botón de WhatsApp principal */}
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="https://wa.me/+543794051686"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-full hover:shadow-xl transition-all duration-300"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Contáctanos por WhatsApp
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 py-8">
          <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="mt-4 md:mt-0 space-y-4 md:space-y-0 items-center mb-8">
              <Socials />
            </div>
            <div className="flex items-center space-x-4 justify-center">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.7 }}
                className="w-10 h-10"
              >
                <Image
                  src={theme === 'dark' ? "/images/logo-dark.png" : "/images/logo.png"}
                  alt="Star Fotto Logo"
                  width={40}
                  height={40}
                  className="rounded-lg object-contain"
                />
              </motion.div>
              <div className="text-gray-600 text-start">
                <p className="font-semibold dark:text-white">Star Fotto Oficial</p>
                <p className="text-sm dark:text-gray-200">© {new Date().getFullYear()} Todos los derechos reservados</p>
              </div>
            </div>

            
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center text-sm text-gray-500 text-end dark:text-gray-200"
          >
            Desarrollado con{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block text-red-500"
            >
              ❤️
            </motion.span>{" "}
            por{" "}
            <Link 
              href="https://www.linkedin.com/in/jorgeharadevs/" 
              className="text-purple-600 hover:text-purple-700 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jorge Hara Devs
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
