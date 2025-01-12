import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const Title = styled.h2`
  color: ${theme.colors.primary.dark};
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
`;

const PartnerName = styled.p`
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.sm};
`;

const PartnersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const partners = [
    {
      id: 1,
      name: "TechCorp",
      logo: (
        <svg className="w-24 h-24" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/>
          <text x="50" y="55" textAnchor="middle" className="text-2xl font-bold">TC</text>
        </svg>
      ),
      description: "Innovación tecnológica"
    },
    {
      id: 2,
      name: "EcoSolutions",
      logo: (
        <svg className="w-24 h-24" viewBox="0 0 100 100">
          <path d="M50,10 L90,90 L10,90 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
          <text x="50" y="70" textAnchor="middle" className="text-xl font-bold">ECO</text>
        </svg>
      ),
      description: "Soluciones sostenibles"
    },
    {
      id: 3,
      name: "CreativeMinds",
      logo: (
        <svg className="w-24 h-24" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" rx="10" fill="none" stroke="currentColor" strokeWidth="2"/>
          <text x="50" y="55" textAnchor="middle" className="text-xl font-bold">CM</text>
        </svg>
      ),
      description: "Diseño creativo"
    },
    {
      id: 4,
      name: "DataFlow",
      logo: (
        <svg className="w-24 h-24" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M20,50 H80 M50,20 V80" stroke="currentColor" strokeWidth="2"/>
          <text x="50" y="55" textAnchor="middle" className="text-xl font-bold">DF</text>
        </svg>
      ),
      description: "Análisis de datos"
    },
    {
      id: 5,
      name: "SportVision",
      logo: (
        <svg className="w-24 h-24" viewBox="0 0 100 100">
          <path d="M20,50 A30,30 0 0,1 80,50" fill="none" stroke="currentColor" strokeWidth="2"/>
          <text x="50" y="55" textAnchor="middle" className="text-xl font-bold">SV</text>
        </svg>
      ),
      description: "Deportes y eventos"
    },
    {
      id: 6,
      name: "MediaPro",
      logo: (
        <svg className="w-24 h-24" viewBox="0 0 100 100">
          <polygon points="50,20 80,80 20,80" fill="none" stroke="currentColor" strokeWidth="2"/>
          <text x="50" y="65" textAnchor="middle" className="text-xl font-bold">MP</text>
        </svg>
      ),
      description: "Producción multimedia"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === partners.length - 4 ? 0 : prevIndex + 1
    );
  }, [partners.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? partners.length - 4 : prevIndex - 1
    );
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <Title className="text-2xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Empresas que confían en nosotros
      </Title>
      
      <div className="relative max-w-6xl mx-auto px-12">
        <div className="flex justify-center items-center gap-8">
          <AnimatePresence mode="wait">
            {partners.slice(currentIndex, currentIndex + 4).map((partner, idx) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: "easeInOut"
                }}
                className="flex flex-col items-center w-1/4"
              >
                <div className="text-gray-600 dark:text-gray-300 transform hover:scale-110 transition-transform duration-300">
                  {partner.logo}
                </div>
                <h3 className="text-lg font-semibold mt-4 text-gray-900 dark:text-white">
                  {partner.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                  {partner.description}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Controles de navegación */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full 
                   bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white 
                   dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full 
                   bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white 
                   dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Indicadores */}
        <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
          {Array.from({ length: partners.length - 3 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentIndex 
                  ? 'bg-purple-500' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersCarousel;
