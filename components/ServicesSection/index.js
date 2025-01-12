import React from 'react';
import { motion } from 'framer-motion';
import { 
  CameraIcon, 
  GlobeAltIcon, 
  PhotoIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Fotografía Deportiva",
      description: "Capturamos la esencia y la emoción de cada momento deportivo con calidad profesional.",
      sports: ["Running", "Tenis", "Maratón", "Paddle", "Beach Vóley"],
      icon: CameraIcon,
      color: "from-purple-500 to-blue-500"
    },
    {
      id: 2,
      title: "Cobertura Internacional",
      description: "Presentes en tres países, cubriendo eventos en toda la región de las Tres Fronteras.",
      locations: ["Foz de Iguazú (Brasil)", "Ciudad del Este (Paraguay)", "Puerto Iguazú (Argentina)"],
      icon: GlobeAltIcon,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      title: "Galería Digital",
      description: "Acceso inmediato a tus fotos a través de nuestra plataforma digital.",
      features: ["Descarga inmediata", "Alta resolución", "Edición profesional"],
      icon: PhotoIcon,
      color: "from-cyan-500 to-emerald-500"
    },
    {
      id: 4,
      title: "Eventos Personalizados",
      description: "Adaptamos nuestros servicios a las necesidades específicas de cada evento deportivo.",
      icon: UserGroupIcon,
      color: "from-emerald-500 to-purple-500"
    }
  ];

  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text mb-6">
            Nuestros Servicios
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto dark:text-gray-200">
            En Star Fotto Oficial nos dedicamos a capturar los momentos más emocionantes del deporte,
            preservando memorias que durarán toda la vida.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="p-8">
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>

                {service.sports && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.sports.map((sport) => (
                      <span
                        key={sport}
                        className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium"
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                )}

                {service.locations && (
                  <div className="space-y-2">
                    {service.locations.map((location) => (
                      <div key={location} className="flex items-center text-gray-600">
                        <GlobeAltIcon className="h-5 w-5 mr-2 text-blue-500" />
                        <span>{location}</span>
                      </div>
                    ))}
                  </div>
                )}

                {service.features && (
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600">
                        <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-purple-600 font-medium hover:text-purple-700 transition-colors duration-200"
                >
                  Conocer más →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 