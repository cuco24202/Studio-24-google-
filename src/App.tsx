/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

// Imports de Componentes y Tipos
import { ServiceItem } from './types';
import AtmosphericBg from './components/AtmosphericBg';
import ServiceCard from './components/ServiceCard';
import TalkModal from './components/TalkModal';
import { Link } from 'react-router-dom';

export default function App() {
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para el fondo del menú
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enlaces del Menú Estricto
  const navLinks = [
    { id: 'home', label: 'Inicio' },
    { id: 'nosotros', label: 'Sobre Nosotros' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'contacto', label: 'Contacto' },
  ];

  // Base de datos de nuestros 2 servicios exclusivos
  const services: ServiceItem[] = [
    {
      id: 'fullstack',
      number: '01',
      category: 'Core Engineering',
      title: 'Desarrollo Web Full-Stack',
      description: 'Código limpio, estructurado y optimizado bajo entornos modernos (React). Creamos plataformas escalables preparadas para soportar alto tráfico de usuarios.',
      iconName: 'code'
    },
    {
      id: 'uiux',
      number: '02',
      category: 'User Experience',
      title: 'Dirección de Arte UI/UX',
      description: 'Interfaces de alta gama con dirección de arte premium y estética editorial fluida. Diseñamos sistemas que retienen la atención de tu audiencia.',
      iconName: 'layers'
    }
  ];

  return (
    <div className="relative min-h-screen bg-surface selection:bg-primary selection:text-surface-lowest antialiased overflow-x-hidden font-sans">
      
      {/* Luces Matemáticas de Fondo */}
      <AtmosphericBg />

      {/* NAVEGACIÓN FIJA */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-surface-dim/80 backdrop-blur-xl border-white/5 py-4' : 'bg-transparent border-transparent py-6 md:py-8'}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#home" className="text-white font-display font-extrabold tracking-tighter text-2xl z-50">
            STUDIO 24.
          </a>
          
          {/* Menú PC */}
          <nav className="hidden md:flex items-center space-x-12 text-xs uppercase tracking-widest font-bold text-on-surface-variant">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="hover:text-primary transition-colors duration-300">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Botones Derecha */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={() => setIsTalkModalOpen(true)}
              className="bg-white text-surface-lowest text-xs uppercase tracking-widest px-6 py-3.5 font-bold hover:bg-primary hover:text-on-primary transition-all duration-300 rounded-full"
            >
              Iniciar Proyecto
            </button>
          </div>

          {/* Botón Menú Móvil */}
          <button 
            className="md:hidden text-white z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menú Desplegable Móvil */}
        <div className={`fixed inset-0 bg-surface-dim/95 backdrop-blur-3xl z-40 flex flex-col items-center justify-center transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col items-center space-y-8 text-xl font-display font-bold text-white tracking-tight">
            {navLinks.map((link) => (
              <a 
                key={link.id} 
                href={`#${link.id}`} 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setIsTalkModalOpen(true);
              }}
              className="mt-8 bg-primary text-on-primary text-sm uppercase tracking-widest px-8 py-4 font-bold rounded-full"
            >
              Iniciar Proyecto
            </button>
          </div>
        </div>
      </header>

      {/* BLOQUE 1: INICIO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 md:px-12 max-w-[1600px] mx-auto pt-24 z-10">
        <div className="w-full space-y-8">
          <p className="text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full inline-block animate-pulse"></span> Ingeniería Web de Alta Gama
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-[110px] lg:text-[130px] font-display font-extrabold tracking-tighter text-white leading-[0.9] max-w-7xl">
            CREAMOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-300 to-secondary">PLATAFORMAS</span> QUE DEFINEN INDUSTRIAS.
          </h1>
          <div className="pt-8 flex flex-col md:flex-row items-start gap-8 border-t border-white/5 max-w-4xl">
            <p className="text-lg md:text-xl text-on-surface-variant font-light leading-relaxed max-w-xl">
              Fusionamos dirección de arte de vanguardia con arquitectura de código robusta. Desarrollamos ventajas competitivas digitales medibles.
            </p>
            <a href="#servicios" className="inline-flex items-center gap-3 group text-xs uppercase tracking-widest font-bold text-white border-b border-primary pb-2 hover:text-primary transition-colors">
              Explorar Soluciones 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* BLOQUE 2: SOBRE NOSOTROS */}
      <section id="nosotros" className="relative py-32 md:py-48 px-6 md:px-12 bg-surface-container-low/30 border-y border-white/5 z-10 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-widest text-secondary font-bold">01 / Identidad</p>
          </div>
          <div className="md:col-span-8 space-y-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-tight">
              "La mediocridad técnica es el asesino silencioso de las grandes ideas."
            </h2>
            <p className="text-on-surface-variant font-light text-lg md:text-xl leading-relaxed max-w-3xl">
              En <span className="text-white font-semibold">Studio 24</span> entendemos que un sitio web es la infraestructura central de tu negocio. Nos especializamos en eliminar la fricción técnica, acelerar la velocidad de carga al extremo y diseñar interfaces memorables que se traducen en autoridad de mercado.
            </p>
          </div>
        </div>
      </section>

      {/* BLOQUE 3: SERVICIOS */}
      <section id="servicios" className="relative py-32 md:py-48 px-6 md:px-12 max-w-[1600px] mx-auto z-10">
        <div className="mb-20">
          <p className="text-xs uppercase tracking-widest text-primary font-bold mb-4">02 / Soluciones</p>
          <h3 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white">NUESTRO EXPERTISE.</h3>
        </div>
        
        {/* Renderizado del Grid usando el Componente ServiceCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onExplore={() => setIsTalkModalOpen(true)} 
            />
          ))}
        </div>
      </section>

      {/* BLOQUE 4: CONTACTO (FOOTER) */}
      <section id="contacto" className="relative py-32 md:py-48 px-6 md:px-12 bg-surface-highest/20 border-t border-white/5 z-10 backdrop-blur-2xl">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-widest text-outline font-bold">03 / Conversación</p>
            <h2 className="text-6xl sm:text-7xl md:text-[110px] lg:text-[140px] font-display font-black text-white tracking-tighter leading-none">
              HABLEMOS.
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-8 text-on-surface-variant font-light w-full md:w-auto">
            <p className="text-on-surface-variant font-light max-w-sm md:text-right text-lg md:text-xl leading-relaxed">
              ¿Tienes un producto digital de alta complejidad entre manos? Iniciemos la estrategia hoy.
            </p>
            <a href="mailto:growth@studio24.com" className="text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-display font-black tracking-tight border-b border-surface-highest pb-2 hover:border-primary transition-all duration-500">
              growth@studio24.com
            </a>
          </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto pt-24 mt-24 border-t border-white/5 flex flex-col md:flex-row justify-between text-xs text-outline-variant gap-4 uppercase tracking-widest font-mono">
          <p>© 2026 STUDIO 24. TODOS LOS DERECHOS RESERVADOS.</p>
          <p>ESTRATEGIA & CÓDIGO DE ALTA DISPONIBILIDAD.</p>
        </div>
      </section>

      {/* MODAL DE CONTACTO */}
      <TalkModal 
        isOpen={isTalkModalOpen} 
        onClose={() => setIsTalkModalOpen(false)} 
      />

      {/* BOTÓN FLOTANTE WHATSAPP (SVG PURO) */}
      <div className="fixed bottom-8 right-8 z-[120]">
        <a 
          href="https://wa.me/524434819353?text=Hola%20Studio%2024.%20Me%20interesa%20hablar%20sobre%20un%20proyecto%20de%20alta%20gama." 
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full hover:bg-[#20ba5a] transition-all duration-300 group shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95"
        >
          {/* Anillos de pulso */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping"></span>
          
          {/* Logo Oficial SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-8 h-8 fill-white relative z-10 transition-transform group-hover:scale-110 duration-300">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
        </a>
      </div>

    </div>
  );
}
