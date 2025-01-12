import { useEffect, useRef, useState } from "react";
import Socials from "../components/Socials";
import Footer from "../components/Footer";
import Head from "next/head";
import { useTheme } from "next-themes";
import AOS from 'aos';
import 'aos/dist/aos.css';
import PartnersCarousel from "../components/PartnersCarousel";
import axios from "axios";
import DiscoverSection from "../components/DiscoverySection";
import ServicesSection from "../components/ServicesSection";
import TopBar from "../components/TopBar";
import styled from "styled-components";
import { theme } from "../styles/theme";

const HeroTitle = styled.h1`
  color: ${theme.colors.primary.main};
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.bold};
`;

const SectionHeading = styled.h2`
  color: ${theme.colors.primary.dark};
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
`;

const Description = styled.p`
  color: ${theme.colors.text.secondary};
  font-family: ${theme.typography.fontFamily.body};
  font-size: ${theme.typography.fontSize.base};
  line-height: 1.6;
`;

export default function Home() {
  // Refs para las secciones
  const workRef = useRef();
  const servicesRef = useRef();
  const aboutRef = useRef();
  const textTwo = useRef();
  const contactRef = useRef();

  // Funciones de desplazamiento
  const handleWorkScroll = () => {
    workRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleServicesScroll = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
};

  const handleContactScroll = () => {
    contactRef.current?.scrollIntoView({ 
      behavior: "smooth", 
      block: "center"
    });
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);


  const { theme } = useTheme();

  return (
    <div className={`relative min-h-screen transition-colors duration-300
      ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-50 to-white'}
      dark:text-white`}
    >

<Head>
        <title>Star Fotto Oficial</title>
      </Head>

     
      <div className={`gradient-circle opacity-25 ${theme === 'dark' ? 'opacity-15' : ''}`} />
      <div className={`gradient-circle-bottom opacity-25 ${theme === 'dark' ? 'opacity-15' : ''}`} />

      <div className="relative">
        <TopBar
          handleWorkScroll={handleWorkScroll}
          handleContactScroll={handleContactScroll}
          handleServicesScroll={handleServicesScroll}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="text-center max-w-4xl mx-auto">
              <h3
                ref={textTwo}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold 
                         bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text
                         transition-all duration-300 ease-in-out leading-tight py-2"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Fotografía profesional de eventos deportivos
              </h3>
            </div>
          </div>

          <div ref={workRef} className="py-2 md:py-24">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8
                         bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300
                         text-transparent bg-clip-text">
                La pasión capturada con la máxima calidad
              </h2>
              
              <div className="flex justify-center mb-12">
                <Socials />
              </div>

              <div className="shadow-2xl rounded-2xl overflow-hidden">
                <PartnersCarousel />
              </div>

              <div className="mt-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 
                           rounded-2xl p-8 shadow-lg">
                <DiscoverSection />
              </div>
            </div>
          </div>     
          
          <div ref={servicesRef} className="py-16 md:py-24 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <ServicesSection />
            </div>
          </div>
          
          <div ref={aboutRef} className="scroll-mt-20">
            <Footer contactRef={contactRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
