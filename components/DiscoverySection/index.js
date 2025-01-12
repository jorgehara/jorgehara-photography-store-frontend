import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon, CameraIcon, CalendarIcon, UserGroupIcon } from '@heroicons/react/24/solid';

const DiscoverSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Carlos Rodríguez",
      role: "Atleta Profesional",
      avatar: "/images/avatar.jpg",
      comment: "Las fotos capturan perfectamente la intensidad de cada momento. ¡Increíble trabajo!",
      rating: 5,
      eventName: "Maratón Ciudad 2023",
      image: "/images/lordvader.jpg",
      date: "Hace 2 semanas",
      purchasedPhotos: 12,
      category: "Maratón"
    },
    {
      id: 2,
      name: "Ana García",
      role: "Entrenadora",
      avatar: "/images/avatar1.jpg",
      comment: "La calidad de las fotos es excepcional. Cada imagen cuenta una historia única.",
      rating: 5,
      eventName: "Torneo Nacional",
      image: "/images/lordvader1.jpg",
      date: "Hace 1 semana",
      purchasedPhotos: 8,
      category: "Fútbol"
    },
    {
      id: 3,
      name: "Miguel Torres",
      role: "Deportista Amateur",
      avatar: "/images/avatar2.jpg",
      comment: "Encontré las mejores fotos de mi participación. El servicio es excelente.",
      rating: 5,
      eventName: "Copa Regional",
      image: "/images/lordvader2.jpg",
      date: "Hace 3 días",
      purchasedPhotos: 15,
      category: "Ciclismo"
    },
    {
      id: 4,
      name: "Laura Martínez",
      role: "Corredora",
      avatar: "/images/avatar3.jpg",
      comment: "Las fotos capturan momentos únicos que no podría haber documentado de otra manera.",
      rating: 5,
      eventName: "Ultra Trail",
      image: "/images/lordvader2.jpg",
      date: "Hace 5 días",
      purchasedPhotos: 10,
      category: "Trail"
    }
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de la sección */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text mb-6">
              Experiencias de Nuestros Atletas
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto dark:text-gray-200">
              Descubre cómo otros deportistas han capturado sus momentos más memorables
            </p>
          </motion.div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 mb-16">
            {[
              { icon: UserGroupIcon, label: "Atletas Satisfechos", value: "2,000+" },
              { icon: CameraIcon, label: "Fotos Entregadas", value: "50,000+" },
              { icon: CalendarIcon, label: "Eventos Cubiertos", value: "120+" },
              { icon: StarIcon, label: "Calificación Promedio", value: "4.9" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <stat.icon className="h-8 w-8 text-purple-500 mb-4 mx-auto" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grid de testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {/* Imagen del evento */}
              <div className="relative h-48">
                <img
                  src={testimonial.image}
                  alt={testimonial.eventName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-purple-600">
                    {testimonial.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">{testimonial.eventName}</h3>
                  <p className="text-white/80 text-sm">{testimonial.date}</p>
                </div>
              </div>

              {/* Contenido del testimonial */}
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>

                {/* Comentario */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {testimonial.comment}
                </p>

                {/* Estadísticas */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    {testimonial.purchasedPhotos} fotos compradas
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    Ver más
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;